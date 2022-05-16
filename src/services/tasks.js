import useApi from "src/composables/UseApi";

export default function taskService() {
  const { list, post, update, remove, getById } = useApi("tasks");

  return {
    list,
    post,
    update,
    remove,
    getById,
  };
}
