<template>
  <q-page padding>
    <q-table
      :rows-per-page-options="[0]"
      title="Tarefas"
      :rows="tasks"
      :columns="columns"
      row-key="name"
    >
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
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            @click="handleEditTask(props.row.id)"
            icon="edit"
            color="info"
            dense
            size="sm"
          />
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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const tasks = ref([]);
    const { list, remove, update } = taskService();
    const $q = useQuasar();
    const router = useRouter();

    const columns = [
      // {
      //   name: "completed",
      //   field: "completed",
      //   label: "Concluído",
      //   align: "left",
      //   sortable: true,
      // },
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

    const handleEditTask = (id) => {
      router.push({ name: "formTask", params: { id } });
    };

    const complete_task = (id) => {
      if (props.row.id) {
        update(tasks.value.completed);
      }
    };

    return {
      tasks,
      columns,
      handleDeleteTask,
      handleEditTask,
      complete_task,
      val: ref(),
    };
  },
});
</script>
