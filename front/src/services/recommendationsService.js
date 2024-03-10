const deleteUser = (users, id) => {
  return users.filter((user) => user.user_id !== id);
}

export default {deleteUser}
