// I intend to create a function called logger, to exist in the middleware
const logger = (req, res, next) => {
  // Then I'll use this to store the current timestamp in milliseconds
  const start = Date.now();

  // Send a response, with an 'event listener'
  //  so basically when it reaches the client the 'finish' event is triggered
  res.on('finish', () => {
    // The duration is just the difference between current time and the time start was initialised
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  // Then I'll pass back control
  next();
};

module.exports = logger;