<script setup lang="ts">
const toast = useToast();

const types = [{
  label: 'Процессор',
  value: 'processor'
}, {
  label: 'GPU',
  value: 'gpu',
}, {
  label: 'Оперативная память',
  value: 'ram',
}, {
  label: 'Жёсткий диск',
  value: 'hdd',
}, {
  label: 'SSD',
  value: 'ssd',
}];
const type = ref(types[0].value);

watch(type, () => {
  loadComponents();
});

onMounted(() => {
  loadComponents();
});

const components = ref([]);
const page = ref(1);

const loadComponents = async () => {
  page.value = 1;
  
  const res = await $fetch('/api/component/', {
    method: 'GET',
    params: {
      category: type.value,
      page: page.value,
      limit: 25,
    },
  });
  
  if (!res.ok) {
    toast.add({title: 'Ошибка', description: res.error, color: 'red', icon: 'i-heroicons-x-circle'});
    components.value = [];
    
    return;
  }
  
  components.value = res.data;
}
</script>

<template>
  <UCard>
    <template #header>
      Комплектующие
    </template>
    
    <UForm>
      <UFormGroup>
        <USelect v-model="type" :options="types" />
      </UFormGroup>
    </UForm>
    
    <template #footer>
      <div v-for="component in components" class="item">
        {{ component.name }}
        <br />
        Характеристики:
        <ul>
          <li v-for="specification in component.specifications" class="specification">
            {{ specification.specification.name }} {{ specification.value }} {{ specification.specification.unit.unit }}
          </li>
        </ul>
      </div>
      
      <UDivider class="py-3" />
      <UPagination v-model="page" :page-count="25" :total="100" />
    </template>
  </UCard>
</template>

<style scoped>

</style>
