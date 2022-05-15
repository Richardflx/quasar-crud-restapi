<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="row q-col-gutter-sm">
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
      <div class="col-12 q-gutter-sm">
        <q-btn
          label="Adicionar"
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
import { defineComponent, ref } from "vue";
import taskService from "src/services/tasks";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "formTask",
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const { post } = taskService();
    const form = ref({
      task: "",
      details: "",
    });

    const onSubmit = async () => {
      try {
        await post(form.value);
        $q.notify({
          message: "Terefa adicionada com sucesso",
          icon: "check",
          color: "positive",
        });
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
