module.exports = ({ plugins }, methods) => {
  const { logger } = plugins;
  
  logger.info("Hello from list users");
  return "List of users";
}