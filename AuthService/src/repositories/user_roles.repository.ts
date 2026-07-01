import { QueryTypes } from "sequelize";
import sequelize from "../db/models/sequelize";


export async function getUserRoles(userId: number) {
  const query = `
    SELECT
      r.id,
      r.name,
      r.description,
      r.created_at,
      r.updated_at
    FROM user_roles ur
    INNER JOIN roles r
      ON ur.role_id = r.id
    WHERE ur.user_id = :userId;
  `;

  return sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
}

export async function assignRoleToUser(
  userId: number,
  roleId: number
) {
  const query = `
    INSERT INTO user_roles (user_id, role_id)
    VALUES (:userId, :roleId);
  `;

  return sequelize.query(query, {
    replacements: { userId, roleId },
    type: QueryTypes.INSERT,
  });

}

export async function removeRoleFromUser(
  userId: number,
  roleId: number
) {
  const query = `
    DELETE FROM user_roles
    WHERE user_id = :userId
      AND role_id = :roleId;
  `;

  return sequelize.query(query, {
    replacements: { userId, roleId },
    type: QueryTypes.DELETE,
  });
}

export async function getUserPermissions(userId: number) {
  const query = `
    SELECT DISTINCT
      p.id,
      p.name,
      p.description,
      p.resource,
      p.action,
      p.created_at,
      p.updated_at
    FROM user_roles ur
    INNER JOIN role_permissions rp
      ON ur.role_id = rp.role_id
    INNER JOIN permissions p
      ON rp.permission_id = p.id
    WHERE ur.user_id = :userId;
  `;

  return sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });
}

export async function hasPermission(
  userId: number,
  permissionName: string
): Promise<boolean> {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM user_roles ur
      INNER JOIN role_permissions rp
        ON ur.role_id = rp.role_id
      INNER JOIN permissions p
        ON rp.permission_id = p.id
      WHERE ur.user_id = :userId
        AND p.name = :permissionName
    ) AS hasPermission;
  `;

  const [result]: any = await sequelize.query(query, {
    replacements: { userId, permissionName },
    type: QueryTypes.SELECT,
  });

  return Boolean(result.hasPermission);
}

export async function hasRole(
  userId: number,
  roleName: string
): Promise<boolean> {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM user_roles ur
      INNER JOIN roles r
        ON ur.role_id = r.id
      WHERE ur.user_id = :userId
        AND r.name = :roleName
    ) AS hasRole;
  `;

  const [result]: any = await sequelize.query(query, {
    replacements: { userId, roleName },
    type: QueryTypes.SELECT,
  });

  return Boolean(result.hasRole);
}

export async function hasAllRoles(
  userId: number,
  roleNames: string[]
): Promise<boolean> {
  if (roleNames.length === 0) {
    return true;
  }

  const placeholders = roleNames
    .map((_, index) => `:role${index}`)
    .join(",");

  const replacements: Record<string, any> = {
    userId,
    totalRoles: roleNames.length,
  };

  roleNames.forEach((role, index) => {
    replacements[`role${index}`] = role;
  });

  const query = `
    SELECT COUNT(DISTINCT r.name) = :totalRoles AS hasAllRoles
    FROM user_roles ur
    INNER JOIN roles r
      ON ur.role_id = r.id
    WHERE ur.user_id = :userId
      AND r.name IN (${placeholders});
  `;

  const [result]: any = await sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return Boolean(result.hasAllRoles);
}

export async function hasAnyRole(
  userId: number,
  roleNames: string[]
): Promise<boolean> {
  if (roleNames.length === 0) {
    return true;
  }

  const placeholders = roleNames
    .map((_, index) => `:role${index}`)
    .join(",");

  const replacements: Record<string, any> = {
    userId,
  };

  roleNames.forEach((role, index) => {
    replacements[`role${index}`] = role;
  });

  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM user_roles ur
      INNER JOIN roles r
        ON ur.role_id = r.id
      WHERE ur.user_id = :userId
        AND r.name IN (${placeholders})
    ) AS hasAnyRole;
  `;

  const [result]: any = await sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return Boolean(result.hasAnyRole);
}