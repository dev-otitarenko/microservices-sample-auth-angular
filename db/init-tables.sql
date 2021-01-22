USE samples

SET NOCOUNT ON
GO

CREATE TABLE [dbo].[oauth_access_token](
    [token_id] [varchar](256) NOT NULL,
    [token] [varbinary](max) NULL,
    [authentication_id] [varchar](256) NULL,
    [user_name] [varchar](256) NULL,
    [client_id] [varchar](256) NULL,
    [authentication] [varbinary](max) NULL,
    [refresh_token] [varchar](256) NULL
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD PRIMARY KEY CLUSTERED
    (
    [token_id] ASC
    )
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD  DEFAULT (NULL) FOR [token_id]
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD  DEFAULT (NULL) FOR [authentication_id]
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD  DEFAULT (NULL) FOR [user_name]
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD  DEFAULT (NULL) FOR [client_id]
    GO
ALTER TABLE [dbo].[oauth_access_token] ADD  DEFAULT (NULL) FOR [refresh_token]
    GO

-- oauth_client_details
CREATE TABLE [dbo].[oauth_client_details](
    [client_id] [varchar](255) NOT NULL,
    [resource_ids] [varchar](255) NULL,
    [client_secret] [varchar](255) NULL,
    [scope] [varchar](255) NULL,
    [authorized_grant_types] [varchar](255) NULL,
    [web_server_redirect_uri] [varchar](255) NULL,
    [authorities] [varchar](255) NULL,
    [access_token_validity] [int] NULL,
    [refresh_token_validity] [int] NULL,
    [additional_information] [varchar](4096) NULL,
    [autoapprove] [varchar](255) NULL
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD PRIMARY KEY CLUSTERED
    (
    [client_id] ASC
    )
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [resource_ids]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [client_secret]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [scope]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [authorized_grant_types]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [web_server_redirect_uri]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [authorities]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [access_token_validity]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [refresh_token_validity]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [additional_information]
    GO
ALTER TABLE [dbo].[oauth_client_details] ADD  DEFAULT (NULL) FOR [autoapprove]
    GO

-- oauth_refresh_token
CREATE TABLE [dbo].[oauth_refresh_token](
    [token_id] [varchar](256) NOT NULL,
    [token] [varbinary](max) NULL,
    [authentication] [varbinary](max) NULL
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
ALTER TABLE [dbo].[oauth_refresh_token] ADD  DEFAULT (NULL) FOR [token_id]
    GO

ALTER TABLE [dbo].[oauth_refresh_token] ADD PRIMARY KEY CLUSTERED
    (
    [token_id] ASC
    )
    GO

-- USERS
CREATE TABLE [dbo].[users](
    [ID] [int] NOT NULL,
    [USERNAME] [varchar](96) NOT NULL,
    [ID_ORG] [int] NOT NULL,
    [PSW] [varchar](128) NULL,
    [EMAIL] [varchar](256) NULL,
    [PHONE] [varchar](256) NULL,
    [OPER_DATE] [datetime2](7) NULL,
    [OPER_USER] [int] NULL,
    [LAST_LOGON] [datetime2](7) NULL,
    [ENABLED] [bit] NOT NULL,
    [account_expired] [bit] NOT NULL,
    [credentials_expired] [bit] NOT NULL,
    [account_locked] [bit] NOT NULL
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED
    (
    [ID] ASC
    )
    GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (sysdatetime()) FOR [OPER_DATE]
    GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((1)) FOR [ENABLED]
    GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [account_expired]
    GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [credentials_expired]
    GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [account_locked]
    GO

-- ORGS
CREATE TABLE [dbo].[orgs](
    [ID] [int] NOT NULL,
    [NAME] [varchar](1024) NOT NULL,
    [ID_PAR] [int] NULL,
    [OPER_DATE] [datetime2](7) NULL,
    [OPER_USER] [varchar](32) NULL,
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[orgs] ADD  CONSTRAINT [PK_ORGS] PRIMARY KEY CLUSTERED
    (
    [ID] ASC
    )
    GO
CREATE NONCLUSTERED INDEX [i_orgs_idpar] ON [dbo].[orgs]
(
	[ID_PAR] ASC
)
GO
ALTER TABLE [dbo].[orgs] ADD  DEFAULT (sysdatetime()) FOR [OPER_DATE]
    GO

-- ROLES
CREATE TABLE [dbo].[roles](
    [ID] [int] NOT NULL,
    [NAME] [nvarchar](128) NOT NULL
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[roles] ADD PRIMARY KEY CLUSTERED
    (
    [ID] ASC
    )
    GO
ALTER TABLE [dbo].[roles] ADD UNIQUE NONCLUSTERED
    (
    [NAME] ASC
    )
    GO

-- USER_ROLES
CREATE TABLE [dbo].[user_roles](
    [ID_USER] [int] NOT NULL,
    [ID_ROLE] [int] NOT NULL,
    [OPER_DATE] [datetime2](7) NULL,
    [OPER_IDWORKER] [varchar](32) NULL
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[user_roles] ADD PRIMARY KEY CLUSTERED
    (
    [ID_USER] ASC,
    [ID_ROLE] ASC
    )
    GO
CREATE NONCLUSTERED INDEX [i_user_roles_idrole] ON [dbo].[user_roles]
(
	[ID_ROLE] ASC
)
GO

-- PERMISSIONS
CREATE TABLE [dbo].[permissions](
    [ID] [int] NOT NULL,
    [NAME] [nvarchar](60) NOT NULL
    ) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[permissions] ADD PRIMARY KEY CLUSTERED
    (
    [ID] ASC
    )
    GO
ALTER TABLE [dbo].[permissions] ADD UNIQUE NONCLUSTERED
    (
    [NAME] ASC
    )
    GO

-- PERMISSION_ROLES
CREATE TABLE [dbo].[permission_roles](
    [ID_ROLE] [int] NOT NULL,
    [ID_PERMISSION] [int] NOT NULL
) ON [PRIMARY]
    GO
ALTER TABLE [dbo].[permission_roles] ADD PRIMARY KEY CLUSTERED
    (
    [ID_ROLE] ASC,
    [ID_PERMISSION] ASC
    )
    GO
ALTER TABLE [dbo].[permission_roles]  WITH CHECK ADD  CONSTRAINT [permission_role_fk1] FOREIGN KEY([ID_PERMISSION])
    REFERENCES [dbo].[permissions] ([ID])
    ON UPDATE CASCADE
       ON DELETE CASCADE
GO
ALTER TABLE [dbo].[permission_roles] CHECK CONSTRAINT [permission_role_fk1]
    GO
ALTER TABLE [dbo].[permission_roles]  WITH CHECK ADD  CONSTRAINT [permission_role_fk2] FOREIGN KEY([ID_ROLE])
    REFERENCES [dbo].[roles] ([ID])
    ON UPDATE CASCADE
       ON DELETE CASCADE
GO
ALTER TABLE [dbo].[permission_roles] CHECK CONSTRAINT [permission_role_fk2]
    GO
ALTER TABLE [dbo].[user_roles] ADD  DEFAULT (sysdatetime()) FOR [OPER_DATE]
    GO
ALTER TABLE [dbo].[user_roles]  WITH CHECK ADD  CONSTRAINT [fk_user_roles_1] FOREIGN KEY([ID_ROLE])
    REFERENCES [dbo].[roles] ([ID])
    ON UPDATE CASCADE
       ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user_roles] CHECK CONSTRAINT [fk_user_roles_1]
    GO
ALTER TABLE [dbo].[user_roles]  WITH CHECK ADD  CONSTRAINT [fk_user_roles_2] FOREIGN KEY([ID_USER])
    REFERENCES [dbo].[users] ([ID])
    ON UPDATE CASCADE
       ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user_roles] CHECK CONSTRAINT [fk_user_roles_2]
    GO