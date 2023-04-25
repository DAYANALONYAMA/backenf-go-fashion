'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const extensionService = strapi.plugin("graphql").service("extension");
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "UsersPermissionsMe",
          definition(t) {
            t.string("firstName");
            t.string("lastName");
            t.string("middleName");
            t.string("telephone");
            t.date("birthDate");
            t.boolean("isActive");
            t.field("avatar", {
              type: "UploadFile",
            });

            t.field("custom_role", {
              type: "CustomRoleEntityResponse",
              resolve: async (parent, args, context) => {
                const data = await strapi.db
                  .query("plugin::users-permissions.user")
                  .findOne({
                    where: { id: parent.id },
                    populate: { custom_role: true },
                  });

                const { toEntityResponse } = strapi.service(
                  "plugin::graphql.format"
                ).returnTypes;

                const response = toEntityResponse(data.custom_role);
                return response;
              },
            });


          },
        }),

        nexus.extendInputType({
          type: "UsersPermissionsRegisterInput",
          definition(t) {
            t.string("name");
            t.string("firstName");
            t.string("lastName");
            t.string("middleName");
            t.string("telephone");
            t.date("birthDate");
            t.boolean("isActive")
            t.field("custom_role", {
              type: "ID",
            });
          },
        }),

        nexus.extendInputType({
          type: "UserRegistrationInput",
          definition(t) {
            t.string("custom_role");
          },
        }),

        // mapboxMarkers
      ],
    }))
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) { },
};
