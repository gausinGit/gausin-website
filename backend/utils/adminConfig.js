/** Whether public admin self-registration is allowed. */
function isAdminRegisterEnabled() {
  const flag = (process.env.ADMIN_ALLOW_REGISTER || '').trim().toLowerCase();
  if (flag === 'true' || flag === '1' || flag === 'yes') return true;
  if (flag === 'false' || flag === '0' || flag === 'no') return false;
  return process.env.NODE_ENV !== 'production';
}

function getJwtExpiresIn() {
  return process.env.ADMIN_JWT_EXPIRES || '4h';
}

module.exports = { isAdminRegisterEnabled, getJwtExpiresIn };
