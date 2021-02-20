const P = require('bluebird');
const mongoose = require('mongoose');
const { db, utils } = require('../../testCommon');
const {
  buildFilterCondition,
  deleteUser,
  getUsers,
  getUserById,
  storeUser,
  updateUser,
} = require('../../../src/services/users/methods');

const { factories, initDatabase } = db;
const { toArrayOfIds } = utils;

describe('#users methods', function () {
  describe('#buildFilterCondition', function () {
    it('should generate OR array with firstName and lastName filters', async function () {
      const query = {
        name: 'test',
      };
      const { $or: result } = await buildFilterCondition(query);
      expect(result).to.be.a('array');

      expect(result[0].first_name).to.exist;
      expect(result[0].first_name).to.be.deep.equal(/test/i);

      expect(result[1].last_name).to.exist;
      expect(result[1].last_name).to.be.deep.equal(/test/i);
    });

    it('should generate roles filter', async function () {
      const query = {
        roles: ['1111', '2222'],
      };
      const result = await buildFilterCondition(query);
      expect(result.roles).to.exist;
      expect(result.roles).to.have.same.members(query.roles);
    });

    it('should generate email filter', async function () {
      const query = {
        email: 'test@example.com',
      };
      const result = await buildFilterCondition(query);
      expect(result.email).to.exist;
      expect(result.email).to.be.deep.equal(/test@example.com/i);
    });

    it('should generate phone filter', async function () {
      const query = {
        phone: '3311112222',
      };
      const result = await buildFilterCondition(query);
      expect(result.phone).to.exist;
      expect(result.phone).to.be.deep.equal(/3311112222/i);
    });

    it('should generate startDate filter', async function () {
      const query = {
        startDate: '01-01-1970',
      };
      const result = await buildFilterCondition(query);
      expect(result.created_at).to.exist;
      expect(result.created_at.$gte).to.be.equal(query.startDate);
    });

    it('should generate endDate filter', async function () {
      const query = {
        endDate: '01-01-2100',
      };
      const result = await buildFilterCondition(query);
      expect(result.created_at).to.exist;
      expect(result.created_at.$lte).to.be.equal(query.endDate);
    });
  });

  describe('#getUsers', function () {
    let roles;
    let users;

    before(async function () {
      await initDatabase();

      roles = await P.all([
        factories.Role.create({ name: 'admin' }),
        factories.Role.create({ name: 'engineer' }),
        factories.Role.create({ name: 'guest' }),
      ]);
      users = await P.all([
        factories.User.create({
          first_name: 'test1',
          last_name: 'fake1',
          username: 'test1',
          roles,
        }),
        factories.User.create({
          first_name: 'fake2',
          last_name: 'test2',
          username: 'test2',
          roles: [roles[0]],
          email: 'test2@example.com',
        }),
        factories.User.create({
          first_name: 'maria',
          last_name: 'perez',
          username: 'maria',
          roles: [roles[1]],
          phone: '3311112222',
        }),
        factories.User.create({
          first_name: 'mario',
          last_name: 'perez',
          username: 'mario',
          roles: [roles[2]],
          createdAt: new Date('2010-01-01'),
        }),
      ]);
    });

    after(async function () {
      await initDatabase();
    });

    it('should get all users', async function () {
      const result = await getUsers({});

      expect(result.length).to.be.equal(users.length);
    });

    describe('options', function () {
      it('should get a limited amount of records', async function () {
        const result = await getUsers({ limit: 2 });

        expect(result.length).to.be.equal(2);
      });

      it('should get records with offset', async function () {
        const result = await getUsers({ offset: 2 });

        expect(result.length).to.be.equal(2); // Since we have 4 users, having an offset of 2 will only get the last 2 records
      });

      it('should order by createdAt ascending', async function () {
        const result = await getUsers({
          sortBy: 'createdAt',
          sortOrder: 'ASC',
        });

        expect(result.length).to.be.equal(users.length);
        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i].createdAt).to.beforeTime(result[i + 1].createdAt);
        }
      });

      it('should order by createdAt descending', async function () {
        const result = await getUsers({
          sortBy: 'createdAt',
          sortOrder: 'DESC',
        });

        expect(result.length).to.be.equal(users.length);
        for (let i = 0; i < result.length - 1; i++) {
          expect(result[i].createdAt).to.afterTime(result[i + 1].createdAt);
        }
      });
    });

    describe('filters', function () {
      it('should filter by first and last name', async function () {
        const result = await getUsers({ name: 'test' });

        expect(result.length).to.be.equal(2);
        expect(toArrayOfIds(result)).to.have.same.members(
          toArrayOfIds(users.slice(0, 2))
        );
      });

      it('should filter by email', async function () {
        const result = await getUsers({ email: 'est2@' });

        expect(result.length).to.be.equal(1);
        expect(result[0].id).to.be.equal(users[1].id);
      });

      it('should filter by phone', async function () {
        const result = await getUsers({ phone: '1111' });

        expect(result.length).to.be.equal(1);
        expect(result[0].id).to.be.equal(users[2].id);
      });

      it('should filter by roles', async function () {
        const rolesToFilter = toArrayOfIds(roles.slice(0, 2));
        const result = await getUsers({ roles: rolesToFilter.join(',') }); // This should build 'someid1,anotherid2'

        expect(result.length).to.be.equal(3);
        expect(toArrayOfIds(result)).to.have.same.members(
          toArrayOfIds(users.slice(0, 3))
        );
      });

      it('should find created since', async function () {
        const result = await getUsers({ startDate: '2015-01-01' });

        expect(result.length).to.be.equal(3);
        expect(toArrayOfIds(result)).to.have.same.members(
          toArrayOfIds(users.slice(0, 3))
        );
      });

      it('should find created until', async function () {
        const result = await getUsers({ endDate: '2015-01-01' });

        expect(result.length).to.be.equal(1);
        expect(result[0].id).to.be.equal(users[3].id);
      });
    });
  });

  describe('#getUserById', function () {
    let user;

    before(async function () {
      await initDatabase();

      user = await factories.User.create();
    });

    after(async function () {
      await initDatabase();
    });

    it('should get user by id with all attributes', async function () {
      const result = await getUserById({ id: user.id });
      expect(result.id).to.be.equal(user.id);

      // Randomly select some attributes. No need to hardcode them all
      expect(result.first_name).to.exist;
      expect(result.roles).to.exist;
      expect(result.createdAt).to.exist;
    });

    it('should return null for unexisting user', async function () {
      const result = await getUserById({ id: mongoose.Types.ObjectId() });

      expect(result).to.be.null;
    });

    it('should only return expected attributes', async function () {
      const result = await getUserById({
        id: user.id,
        attributes: ['first_name', 'email'],
      });

      expect(result.id).to.be.equal(user.id);
      expect(result.first_name).to.exist;
      expect(result.email).to.exist;
      expect(result.createdAt).to.not.exist;
    });
  });
});
