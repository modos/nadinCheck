<script setup lang="ts">
const tasks = ref([]);
const newTaskTitle = ref("");
const editingTask = ref(null);
const editTitle = ref("");

const fetchTasks = async () => {
  tasks.value = await $fetch("/api/tasks", {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
};

const addTask = async () => {
  if (!newTaskTitle.value.trim()) return;
  const task = await $fetch("/api/tasks", {
    method: "POST",
    body: { title: newTaskTitle.value },
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
  tasks.value.push(task);
  newTaskTitle.value = "";
};

const toggleDone = async (task) => {
  await $fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
    body: { completed: !task.completed },
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
  task.completed = !task.completed;
};

const startEdit = (task) => {
  editingTask.value = task;
  editTitle.value = task.title;
};

const saveEdit = async () => {
  if (!editingTask.value) return;
  await $fetch(`/api/tasks/${editingTask.value.id}`, {
    method: "PATCH",
    body: { title: editTitle.value },
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
  editingTask.value.title = editTitle.value;
  editingTask.value = null;
};

const deleteTask = async (id: number) => {
  await $fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
  });
  tasks.value = tasks.value.filter((t) => t.id !== id);
};

onMounted(fetchTasks);
</script>

<template>
  <v-card elevation="4" class="pa-6">
    <v-card-title class="text-h5 d-flex align-center">
      <v-icon left class="mr-2">mdi-format-list-checkbox</v-icon>
      My Tasks
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="newTaskTitle"
        label="Add a new task"
        append-inner-icon="mdi-plus"
        variant="outlined"
        @keyup.enter="addTask"
        @click:append-inner="addTask"
      />

      <v-list lines="one">
        <v-list-item v-for="task in tasks" :key="task.id" class="px-0">
          <template #prepend>
            <v-checkbox-btn
              :model-value="task.completed"
              @update:model-value="toggleDone(task)"
            />
          </template>

          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.completed }"
          >
            <template v-if="editingTask?.id === task.id">
              <v-text-field
                v-model="editTitle"
                density="compact"
                hide-details
                variant="underlined"
                autofocus
                @keyup.enter="saveEdit"
                @blur="saveEdit"
              />
            </template>
            <template v-else>
              {{ task.title }}
            </template>
          </v-list-item-title>

          <template #append>
            <v-btn
              icon="mdi-pencil"
              variant="text"
              size="small"
              @click="startEdit(task)"
            />
            <v-btn
              icon="mdi-delete"
              variant="text"
              size="small"
              color="error"
              @click="deleteTask(task.id)"
            />
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
