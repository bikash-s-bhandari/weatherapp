const welcome = (data) => {
    const { name, email, password } = data;
    return `
      <!DOCTYPE html>
  <html style="margin: 0; padding: 0;">
  
      <head>
          <title>One | Email template!</title>
      </head>
  
          <body style="margin: 0; padding: 0;">
              <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                  <tr>
                      <td style="background-color: #999592; margin: 0 auto;">
                          <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">Welcome to DevNepal</h1></td>
                  </tr>
                  <tr>
                      <td style="margin: 0 auto;">
                          <a href="/" style="box-sizing: border-box; color: #999592 !important; font-family: Arial, Helvetica, sans-serif; line-height: 1.4; margin: 0; text-decoration: none;"><img class="full-width" src="https://i7s6h3v8.rocketcdn.me/wp-content/uploads/2019/10/nuturing-a-developer-community-sparkpost-1000px-2.png" style="vertical-align: sub; width: 100%;"></a>
                      </td>
                  </tr>
                  <tr>
                      <td style="background-color: #999592; margin: 0 auto;">
                          <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center;font-size:10px">
                                 Dear ${name}, you have signup through social media, if you want to login vai your email and password the here is your credentials <br/>
                                 Email:${email}</br>
                                 Password:${password}
                          </p></td>
                  </tr>
              </table>
          </body>
  
    </html>
      `;
};

module.exports = { welcome };