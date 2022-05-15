<template>
  <q-page padding>
    <q-table title="Tarefas" :rows="tasks" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5">Tarefas</span>
        <q-space />
        <q-btn
          color="primary"
          label="Novo registro"
          :to="{ name: 'formTask' }"
        ></q-btn>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            @click="handleDeleteTask(props.row.id)"
            icon="delete"
            color="negative"
            dense
            size="sm"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import taskService from "src/services/tasks";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const tasks = ref([]);
    const { list, remove } = taskService();
    const $q = useQuasar();
    const columns = [
      {
        name: "id",
        field: "id",
        label: "ToDo Id",
        align: "left",
        sortable: true,
      },
      {
        name: "task",
        field: "task",
        label: "Tarefa",
        align: "left",
        sortable: true,
      },
      {
        name: "details",
        field: "details",
        label: "Detalhes",
        align: "left",
        sortable: true,
      },
      {
        name: "actions",
        field: "actions",
        label: "Ações",
        align: "right",
      },
    ];

    onMounted(() => getTasks());

    const getTasks = async () => {
      try {
        const data = await list();
        tasks.value = data;
      } catch (err) {}
    };

    const handleDeleteTask = async (id) => {
      try {
        $q.dialog({
          title: "Aviso",
          message: "Deseja remover esta tarefa?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Apagado com sucesso",
            icon: "check",
            color: "positive",
          });
          await getTasks();
        });
      } catch (error) {
        $q.notify({
          message: "Erro ao apagar",
          icon: "times",
          color: "negative",
        });
      }
    };

    return {
      tasks,
      columns,
      handleDeleteTask,
    };
  },
});
</script>
