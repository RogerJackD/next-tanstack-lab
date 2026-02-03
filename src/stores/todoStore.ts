import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// ============================================
// 📚 CONCEPTOS DE ZUSTAND - TODO STORE
// ============================================

// 1️⃣ TIPOS - Definir interfaces claras
interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
}

type FilterType = 'all' | 'active' | 'completed';

interface TodoState {
    // Estado
    todos: Todo[];
    filter: FilterType;
    isLoading: boolean;

    // Acciones básicas
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;

    // Acciones de filtro
    setFilter: (filter: FilterType) => void;

    // Acciones bulk
    clearCompleted: () => void;
    toggleAll: () => void;

    // 2️⃣ ACCIONES ASÍNCRONAS
    loadTodosFromAPI: () => Promise<void>;

    // 3️⃣ GETTERS / ESTADO DERIVADO (computed values)
    getFilteredTodos: () => Todo[];
    getActiveCount: () => number;
    getCompletedCount: () => number;
    getTotalCount: () => number;
}

// 4️⃣ MIDDLEWARE COMBINADOS: devtools + persist + immer
// - devtools: permite ver el estado en Redux DevTools
// - persist: guarda el estado en localStorage
// - immer: permite mutar el estado directamente (inmutabilidad automática)

// ============================================
// 9️⃣ SELECTORES - Para optimizar re-renders
// Usa selectores cuando solo necesitas parte del estado
// ============================================

// Selector para solo obtener el conteo (no causa re-render si los todos cambian pero el conteo no)
export const useTodoCount = () => useTodoStore((state) => state.todos.length);

// Selector para el filtro actual
export const useTodoFilter = () => useTodoStore((state) => state.filter);

// Selector con shallow comparison para arrays/objetos
// import { shallow } from 'zustand/shallow'
// export const useTodoActions = () => useTodoStore(
//     (state) => ({ addTodo: state.addTodo, removeTodo: state.removeTodo }),
//     shallow
// );

// ============================================
// 🔟 SUBSCRIBE - Escuchar cambios fuera de React
// ============================================

// Ejemplo: log cada vez que cambia el estado
// useTodoStore.subscribe((state, prevState) => {
//     console.log('Estado cambió:', { prev: prevState, current: state });
// });

// Subscribe a una parte específica del estado
// useTodoStore.subscribe(
//     (state) => state.todos.length,
//     (length, prevLength) => {
//         console.log(`Todos: ${prevLength} -> ${length}`);
//     }
// );
