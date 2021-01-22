USE samples
-- insert data
delete from oauth_client_details

insert into oauth_client_details (client_id, client_secret, scope, authorized_grant_types, access_token_validity, refresh_token_validity, additional_information)
    values (
    'adminapp',
    '{bcrypt}$2a$10$EOs8VROb14e7ZnydvXECA.4LoIhPOoFHKvVF/iBZ/ker17Eocz4Vi',
    'read,write,admin',
    'authorization_code,password,refresh_token,implicit',
    9000,
    60000,
    '{}');

INSERT INTO orgs
(ID, NAME, ID_PAR, OPER_DATE, OPER_USER)
VALUES(0, 'MY ORGANIZATION', NULL, '2021-01-01 12:00:00.175', NULL);

INSERT INTO roles
(ID, NAME)
VALUES(1, 'ROLE_ADMIN');

INSERT INTO users
(ID, USERNAME, ID_ORG, PSW, EMAIL, PHONE, OPER_DATE, OPER_USER, LAST_LOGON, ENABLED, account_expired, credentials_expired, account_locked)
VALUES(0, 'ADM-USER', 0, '{bcrypt}$2y$12$CyHvit6/F5S3Z2IFf552S.vRPNbe7Y.7ekePMB2BfQsZCqo7D.ixu', 'atitarenko.eng@gmail.com', NULL, '2020-05-11 12:36:13.123', 0, '2021-01-10 12:25:09.421', 1, 0, 0, 0);

INSERT INTO users
(ID, USERNAME, ID_ORG, PSW, EMAIL, PHONE, OPER_DATE, OPER_USER, LAST_LOGON, ENABLED, account_expired, credentials_expired, account_locked)
VALUES(1, 'USER', 0, '{bcrypt}$2y$12$CyHvit6/F5S3Z2IFf552S.vRPNbe7Y.7ekePMB2BfQsZCqo7D.ixu', 'atitarenko.eng@gmail.com', NULL, '2020-05-11 12:36:13.123', 0, '2021-01-10 12:25:09.421', 1, 0, 0, 0);

INSERT INTO user_roles (ID_USER, ID_ROLE) values (0, 1);
