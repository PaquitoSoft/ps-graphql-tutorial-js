import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

const DIRECTVE_NAME = 'authRequired';

function authRequiredDirective() {
  return {
    authDirectiveTypeDef: `directive @${DIRECTVE_NAME}(reason: String = "Auth header required") on FIELD_DEFINITION`,
    authDirectiveTransformer: (schema) => {
      return mapSchema(schema, {
        [MapperKind.FIELD](fieldConfig) {
          const authDirective = getDirective(schema, fieldConfig, DIRECTVE_NAME)?.[0];

          if (authDirective) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = function(parent, params, context, info) {
              if (!context.userId) {
                throw new Error('Auth header required.');
              }
              return resolve(parent, params, context, info);
            }
          }

          return fieldConfig;
        }
      });
    }
  };
}

export default authRequiredDirective;
