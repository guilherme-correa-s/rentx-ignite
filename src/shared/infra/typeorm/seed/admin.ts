import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection('localhost');

  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(name, email, password, "isAdmin", created_at, driver_license) 
    values('admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXTESTE')`,
  );

  await connection.close();
}

create().then(() => console.log('User admin created!'));
