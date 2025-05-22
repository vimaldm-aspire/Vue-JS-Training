import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const newTask = ref('');
const tasks = computed(() => store.state.tasks);
const completedCount = computed(() => store.getters.completedCount);
function addTask() {
    if (newTask.value.trim()) {
        store.dispatch('addTask', newTask.value.trim());
        newTask.value = '';
    }
}
function removeTask(index) {
    store.dispatch('removeTask', index);
}
function toggleTask(index) {
    store.dispatch('toggleTask', index);
}
onMounted(() => {
    store.dispatch('loadFromStorage');
    if (store.state.tasks.length === 0) {
        store.dispatch('loadTasks'); // fallback to JSON if no localStorage
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onKeyup: (__VLS_ctx.addTask) },
    placeholder: "Add new task",
});
(__VLS_ctx.newTask);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.addTask) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
for (const [task, index] of __VLS_getVForSourceType((__VLS_ctx.tasks))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onChange: (...[$event]) => {
                __VLS_ctx.toggleTask(index);
            } },
        type: "checkbox",
    });
    (task.completed);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ({ done: task.completed }) },
    });
    (task.text);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.removeTask(index);
            } },
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.completedCount);
/** @type {__VLS_StyleScopedClasses['done']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            newTask: newTask,
            tasks: tasks,
            completedCount: completedCount,
            addTask: addTask,
            removeTask: removeTask,
            toggleTask: toggleTask,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
