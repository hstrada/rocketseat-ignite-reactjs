import { useAuth } from '../contexts/AuthContext'
import { validateUserPermissions } from '../utils/validateUserPermissions'

type useCanParams = {
  permissions?: string[]
  roles?: string[]
}

export function useCan({ permissions = [], roles = [] }: useCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles,
  })

  return userHasValidPermissions
}
