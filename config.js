module.exports = {
  port: process.env.PORT || 3000,
  jwt_secret : process.env.JWT_SECRET || "",
  ssl_enabled : process.env.SSL_ENABLED || "",
  ssl_key : process.env.SSL_KEY || "",
  ssl_cert : process.env.SSL_CERT || "",
  
}
