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

export const useTodoStore = create<TodoState>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Estado inicial
                todos: [],
                filter: 'all',
                isLoading: false,

                // ============================================
                // ACCIONES BÁSICAS
                // ============================================

                // 5️⃣ CON IMMER: puedes "mutar" directamente
                addTodo: (text) => set((state) => {
                    state.todos.push({
                        id: crypto.randomUUID(),
                        text,
                        completed: false,
                        createdAt: new Date(),
                    });
                }, false, 'addTodo'), // El tercer arg es el nombre de la acción para devtools

                removeTodo: (id) => set((state) => {
                    state.todos = state.todos.filter(todo => todo.id !== id);
                }, false, 'removeTodo'),

                toggleTodo: (id) => set((state) => {
                    const todo = state.todos.find(t => t.id === id);
                    if (todo) {
                        todo.completed = !todo.completed;
                    }
                }, false, 'toggleTodo'),

                editTodo: (id, text) => set((state) => {
                    const todo = state.todos.find(t => t.id === id);
                    if (todo) {
                        todo.text = text;
                    }
                }, false, 'editTodo'),

                setFilter: (filter) => set({ filter }, false, 'setFilter'),

                // ============================================
                // ACCIONES BULK
                // ============================================

                clearCompleted: () => set((state) => {
                    state.todos = state.todos.filter(todo => !todo.completed);
                }, false, 'clearCompleted'),

                toggleAll: () => set((state) => {
                    const allCompleted = state.todos.every(t => t.completed);
                    state.todos.forEach(todo => {
                        todo.completed = !allCompleted;
                    });
                }, false, 'toggleAll'),

                // ============================================
                // 6️⃣ ACCIONES ASÍNCRONAS
                // ============================================

                loadTodosFromAPI: async () => {
                    set({ isLoading: true }, false, 'loadTodosFromAPI/pending');

                    try {
                        // Simulamos una llamada API
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        const mockTodos: Todo[] = [
                            { id: '1', text: 'Aprender Zustand básico ✅', completed: true, createdAt: new Date() },
                            { id: '2', text: 'Aprender middleware persist', completed: false, createdAt: new Date() },
                            { id: '3', text: 'Aprender middleware devtools', completed: false, createdAt: new Date() },
                            { id: '4', text: 'Aprender middleware immer', completed: false, createdAt: new Date() },
                        ];

                        set({ todos: mockTodos, isLoading: false }, false, 'loadTodosFromAPI/fulfilled');
                    } catch (error) {
                        set({ isLoading: false }, false, 'loadTodosFromAPI/rejected');
                    }
                },

                // ============================================
                // 7️⃣ GETTERS - Estado derivado (computed values)
                // Usa get() para acceder al estado actual
                // ============================================

                getFilteredTodos: () => {
                    const { todos, filter } = get();
                    switch (filter) {
                        case 'active':
                            return todos.filter(t => !t.completed);
                        case 'completed':
                            return todos.filter(t => t.completed);
                        default:
                            return todos;
                    }
                },

                getActiveCount: () => get().todos.filter(t => !t.completed).length,

                getCompletedCount: () => get().todos.filter(t => t.completed).length,

                getTotalCount: () => get().todos.length,
            })),
            {
                name: 'todo-storage', // nombre en localStorage
                // 8️⃣ PARTIALIZE: solo persistir ciertos campos
                partialize: (state) => ({
                    todos: state.todos,
                    filter: state.filter
                }),
            }
        ),
        { name: 'TodoStore' } // nombre en Redux DevTools
    )
);

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
