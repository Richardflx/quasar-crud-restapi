<template>
  <q-page padding>
    <q-table title="Treats" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            @click="handleDeletePost(props.row.id)"
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
import postService from "src/services/posts";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const posts = ref([]);
    const { list, remove } = postService();
    const $q = useQuasar();
    const columns = [
      {
        name: "id",
        field: "id",
        label: "Post Id",
        align: "left",
        sortable: true,
      },
      {
        name: "title",
        field: "title",
        label: "Título",
        align: "left",
        sortable: true,
      },
      {
        name: "content",
        field: "content",
        label: "Conteúdo",
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

    onMounted(() => getPosts());

    const getPosts = async () => {
      try {
        const data = await list();
        posts.value = data;
      } catch (err) {}
    };

    const handleDeletePost = async (id) => {
      try {
        $q.dialog({
          title: "Aviso",
          message: "Deseja remover este post?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Apagado com sucesso",
            icon: "check",
            color: "positive",
          });
          await getPosts();
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
      posts,
      columns,
      handleDeletePost,
    };
  },
});
</script>
