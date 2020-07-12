import { Response, NextFunction, Request } from 'express';
import { verify, sign } from 'jsonwebtoken';
import { cookie } from 'request';


const jwtSecret ="abc123456xyz";
export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies['token'];
    
    if (accessToken) {
        const token = accessToken;
        verify(token, jwtSecret, (err: any, user: any) => {
            if (err) {
                res.status(403).json({
                    message: 'Forbidden',
                    status:403
                })
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            message: 'Unauthorized',
            status: 401
        })
    }
};
export const authenticateRefreshToken = (req: any, res: Response, next: NextFunction) => {
  //get refresh token
  const refreshToken = req.headers.authorization;
  if (refreshToken) {
      const token = refreshToken.split(' ')[1];
      verify(token, jwtSecret, (err: any, data: any) => {
          if (err) {
              return res.status(403).json({
                message: 'Forbidden'
              });
          }
          const newAccessToken = sign(
            {
              username: data.username,
              password: data.password
            },
            jwtSecret, {
            expiresIn: 7200
          });
          return res.status(200).json({
            'access-token': newAccessToken,
            'fresh-token': refreshToken
          })
      });
  } else {
      res.status(401).json({
        message: 'Unauthorized'
      });
  }
};

export const generateToken = (user: any): {accessToken: string, refreshToken: string} => {
  const accessToken = sign(user, jwtSecret, {
    expiresIn: 720000
  })
  const refreshToken = sign(user,jwtSecret, {
    expiresIn: 604800
  })
  return {accessToken, refreshToken}
}
