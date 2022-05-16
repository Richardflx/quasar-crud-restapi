<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outlined
        v-model="form.task"
        label="Tarefa"
        lazy-rules
        class="col-lg-6 col-xs-12"
        :rules="[
          (val) => (val && val.length > 0) || 'Preenchimento obrigatório',
        ]"
      />
      <q-input
        outlined
        v-model="form.details"
        label="Detalhes"
        lazy-rules
        class="col-lg-6 col-xs-12"
      />

      <!-- <q-toggle v-model="form.completed" label="Concluído?" /> -->

      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Salvar"
          color="primary"
          class="float-right"
          icon="save"
          type="submit"
        />
        <q-btn
          label="Cancelar"
          color="white"
          class="float-right"
          text-color="primary"
          :to="{ name: 'home' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import taskService from "src/services/tasks";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "formTask",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update } = taskService();

    const form = ref({
      task: "",
      details: "",
      completed: false,
    });

    onMounted(async () => {
      if (route.params.id) {
        getTask(route.params.id);
      }
    });

    const getTask = async (id) => {
      try {
        const response = await getById(id);
        form.value = response;
      } catch (error) {
        router.push({ name: "home" });
        $q.notify({
          message: "Tarefa não existe",
          icon: "error",
          color: "negative",
        });
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update(form.value);
          $q.notify({
            message: "Terefa modificada com sucesso",
            icon: "check",
            color: "positive",
          });
        } else {
          await post(form.value);
          $q.notify({
            message: "Terefa adicionada com sucesso",
            icon: "check",
            color: "positive",
          });
        }
        router.push({ name: "home" });
      } catch (error) {
        alert(error);
      }
    };
    return {
      form,
      onSubmit,
    };
  },
});
</script>
