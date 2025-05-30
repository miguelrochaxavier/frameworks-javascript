<script setup>
import { ref, computed } from 'vue';

// ref == váriaveis reativas ao projeto;

const novaTarefa = ref('');
const tarefas = ref([]);
const filtro = ref('todas');

const adicionarTarefa = () => {
    if (novaTarefa.value.trim()) { //.trim() apaga os espaçoes em branco de uma variavel
        tarefas.value.push({
            id: Date.now(),
            titulo: novaTarefa.value,
            completa: false
        });

        novaTarefa.value = '';
    };
}
const removerTarefa = (id) => {
    tarefas.value = tarefas.value.filter(tarefa => tarefa.id !== id);
};
const alternarEstado = (id) => {
    const tarefa = tarefa.value.find(t => t.id === id);

    if (tarefa) tarefa.completa = !tarefa.completada;
};
const tarefasFiltradas = computed(() => {
    switch (filtro.value) {
        case 'pendentes':
            return tarefas.value.filter(t => !t.completa);
        case 'completas':
            return tarefas.value.filter(t => t.completa);
        default:
            return tarefas.value;
    }
});

const tarefasPendentes = computed(() => tarefas.value.filter(t => !t.completa).length);
</script>

<template>
    <div class="container">
        <h1>Minha Lista de Tarefas</h1>

        <div class="adicionar-container">
            <input v-model="novaTarefa" @keyup.enter="adicionarTarefa" placeholder="Nova tarefa..." />
            <button @click="adicionarTarefa">Adicionar</button>
        </div>

        <div class="filtros">
            <button :class="{ ativo: filtro === 'todas' }" @click="filtro = 'todas'">
                Todas
            </button>
            <button :class="{ ativo: filtro === 'pendentes' }" @click="filtro = 'pendentes'">
                Pendentes
            </button>
            <button :class="{ ativo: filtro === 'completas' }" @click="filtro = 'completas'">
                Completas
            </button>
        </div>

        <ul>
            <li v-for="tarefa in tarefasFiltradas" :key="tarefa.id" :class="{ completa: tarefa.completa }">
                <input type="checkbox" :checked="tarefa.completa" @change="alternarEstado(tarefa.id)" />
                <span>{{ tarefa.titulo }}</span>
                <button @click="removerTarefa(tarefa.id)">✕</button>
            </li>
        </ul>

        <p class="contador">{{ tarefasPendentes }} tarefas pendentes</p>
    </div>
</template>

<style scoped>
.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
}

.adicionar-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 10px 15px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.filtros {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.filtros button.ativo {
    background-color: #35495e;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 4px;
    margin-bottom: 8px;
}

li.completa span {
    text-decoration: line-through;
    color: #777;
}

li button {
    margin-left: auto;
    background-color: #ff6b6b;
    padding: 5px 10px;
}

.contador {
    text-align: center;
    color: #666;
}
</style>