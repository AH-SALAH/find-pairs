// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
      hi: ['Merhaba', 'こんにちは'],
      thanks: 'Thanks for passing by',
      name: 'AH-SALAH', 
      git: 'https://github.com/AH-SALAH' 
    });
};
