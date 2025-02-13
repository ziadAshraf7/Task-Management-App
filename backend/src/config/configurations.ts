

export default () => ({
        auth : {
          jwtSecret : process.env.JWT_KEY
        } ,
        database: {
          url: process.env.DATABASE_HOST
        }    
  });
  