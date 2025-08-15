import {collection, doc, getDoc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase";

export type AdminLevel = "super" | "manager" | "editor";

export interface AdminUser {
  uid: string;
  email: string;
  level: AdminLevel;
  permissions: readonly string[];
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export const ADMIN_PERMISSIONS = {
  super: [
    "manage_users",
    "manage_products",
    "manage_orders",
    "view_analytics",
    "manage_settings",
    "manage_admins",
    "manage_content",
    "view_reports",
  ],
  manager: [
    "manage_products",
    "manage_orders",
    "view_analytics",
    "manage_settings",
    "manage_content",
    "view_reports",
  ],
  editor: ["manage_products", "view_orders", "view_analytics", "manage_content"],
} as const;

export async function createAdminUser(
  uid: string,
  email: string,
  level: AdminLevel,
  createdBy?: string
): Promise<AdminUser> {
  const adminData: AdminUser = {
    uid,
    email,
    level,
    permissions: ADMIN_PERMISSIONS[level] || [],
    createdAt: new Date(),
    lastLogin: new Date(),
    isActive: true,
  };

  await setDoc(doc(db, "admins", uid), {
    ...adminData,
    createdBy: createdBy || "system",
  });

  return adminData;
}

export async function getAdminUser(uid: string): Promise<AdminUser | null> {
  try {
    const adminDoc = await getDoc(doc(db, "admins", uid));
    if (!adminDoc.exists()) return null;

    const data = adminDoc.data();
    return {
      uid,
      email: data.email,
      level: data.level,
      permissions: data.permissions || ADMIN_PERMISSIONS[data.level as AdminLevel] || [],
      createdAt: data.createdAt?.toDate() || new Date(),
      lastLogin: data.lastLogin?.toDate(),
      isActive: data.isActive !== false,
    };
  } catch (error) {
    console.error("Error getting admin user:", error);
    return null;
  }
}

export async function updateAdminUser(uid: string, updates: Partial<AdminUser>): Promise<void> {
  await updateDoc(doc(db, "admins", uid), {
    ...updates,
    lastLogin: new Date(),
  });
}

export async function getAllAdmins(): Promise<AdminUser[]> {
  try {
    const adminsQuery = query(collection(db, "admins"));
    const snapshot = await getDocs(adminsQuery);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        email: data.email,
        level: data.level,
        permissions: data.permissions || ADMIN_PERMISSIONS[data.level as AdminLevel] || [],
        createdAt: data.createdAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate(),
        isActive: data.isActive !== false,
      };
    });
  } catch (error) {
    console.error("Error getting all admins:", error);
    return [];
  }
}

export async function isUserAdmin(uid: string): Promise<boolean> {
  const adminUser = await getAdminUser(uid);
  return adminUser !== null && adminUser.isActive;
}

export function hasPermission(adminUser: AdminUser | null, permission: string): boolean {
  if (!adminUser || !adminUser.isActive) return false;
  return adminUser.permissions.includes(permission);
}

export function isAdminLevel(adminUser: AdminUser | null, level: AdminLevel): boolean {
  if (!adminUser || !adminUser.isActive) return false;
  const levels = ["editor", "manager", "super"];
  const userLevelIndex = levels.indexOf(adminUser.level);
  const requiredLevelIndex = levels.indexOf(level);
  return userLevelIndex >= requiredLevelIndex;
}
