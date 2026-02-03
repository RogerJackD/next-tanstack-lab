'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducts } from "@/hooks/use-users";
import { useCounterStore } from "@/stores/counterStore";
import { useTodoStore, useTodoCount } from "@/stores/todoStore";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const {data: products = [], isLoading } = useProducts();

  // ============================================
  // 1️⃣ COUNTER STORE (básico)
  // ============================================
  const { count, increment, decrement, reset} = useCounterStore();

  // ============================================
  // 2️⃣ TODO STORE (avanzado)
  // ============================================
  const {
    todos,
    filter,
    isLoading: todosLoading,
    addTodo,
    removeTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    toggleAll,
    loadTodosFromAPI,
    getFilteredTodos,
    getActiveCount,
    getCompletedCount,
  } = useTodoStore();

  // 3️⃣ SELECTOR OPTIMIZADO - solo se re-renderiza cuando cambia el count
  const todoCount = useTodoCount();

  // Estado local para el input
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };


  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Zustand Learning Lab</h1>

      {/* ============================================ */}
      {/* SECCIÓN 1: COUNTER STORE (básico) */}
      {/* ============================================ */}
      <section className="border rounded-lg p-4 bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">1️⃣ Counter Store (Básico)</h2>
        <div className="flex items-center gap-4">
          <span className="text-4xl font-mono">{count}</span>
          <Button onClick={increment}>+1</Button>
          <Button onClick={decrement}>-1</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 2: TODO STORE (avanzado) */}
      {/* ============================================ */}
      <section className="border rounded-lg p-4 bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">2️⃣ Todo Store (Avanzado)</h2>

        {/* Conceptos mostrados */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-xs">
          <span className="bg-green-100 px-2 py-1 rounded">✅ persist (localStorage)</span>
          <span className="bg-purple-100 px-2 py-1 rounded">🔧 devtools</span>
          <span className="bg-yellow-100 px-2 py-1 rounded">📝 immer</span>
          <span className="bg-blue-100 px-2 py-1 rounded">⚡ async actions</span>
        </div>

        {/* Stats usando getters */}
        <div className="flex gap-4 mb-4 text-sm">
          <span className="bg-white px-3 py-1 rounded shadow">Total: {todoCount}</span>
          <span className="bg-orange-100 px-3 py-1 rounded">Activos: {getActiveCount()}</span>
          <span className="bg-green-100 px-3 py-1 rounded">Completados: {getCompletedCount()}</span>
        </div>

        {/* Input para agregar todo */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
            placeholder="Agregar nuevo todo..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <Button onClick={handleAddTodo}>Agregar</Button>
          <Button variant="outline" onClick={loadTodosFromAPI} disabled={todosLoading}>
            {todosLoading ? 'Cargando...' : 'Cargar desde API'}
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Activos
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completados
          </Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={toggleAll}>
            Toggle All
          </Button>
          <Button variant="destructive" size="sm" onClick={clearCompleted}>
            Limpiar completados
          </Button>
        </div>

        {/* Lista de todos */}
        <ul className="space-y-2">
          {getFilteredTodos().map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center gap-3 p-3 bg-white rounded shadow-sm ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5"
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No hay todos. ¡Agrega uno o carga desde la API!
          </p>
        )}
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 3: TIPS DE ZUSTAND */}
      {/* ============================================ */}
      <section className="border rounded-lg p-4 bg-amber-50">
        <h2 className="text-xl font-semibold mb-4">📚 Conceptos Aprendidos</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white p-3 rounded">
            <strong>persist:</strong> Los todos se guardan en localStorage. Recarga la página y verás que persisten.
          </div>
          <div className="bg-white p-3 rounded">
            <strong>devtools:</strong> Abre Redux DevTools en tu navegador para ver el estado y las acciones.
          </div>
          <div className="bg-white p-3 rounded">
            <strong>immer:</strong> Permite &quot;mutar&quot; el estado directamente (state.todos.push) manteniendo inmutabilidad.
          </div>
          <div className="bg-white p-3 rounded">
            <strong>async actions:</strong> loadTodosFromAPI es una acción asíncrona con estado de loading.
          </div>
          <div className="bg-white p-3 rounded">
            <strong>getters:</strong> getFilteredTodos(), getActiveCount() son estado derivado calculado on-demand.
          </div>
          <div className="bg-white p-3 rounded">
            <strong>selectores:</strong> useTodoCount() es un selector optimizado que evita re-renders innecesarios.
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCIÓN 4: PRODUCTOS (TanStack Query) */}
      {/* ============================================ */}
      <section className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">4️⃣ Productos (TanStack Query)</h2>
        <Table>
          <TableCaption>Total {products.length} Productos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">ID</TableHead>
              <TableHead>Titulo</TableHead>
              <TableHead>Descripcion</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="w-25">Imagen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="group hover:bg-muted/50 transition-colors duration-200"
              >
                <TableCell className="font-mono text-xs text-muted-foreground py-4">
                  #{product.id}
                </TableCell>
                <TableCell className="font-semibold text-sm py-4">
                  {product.title}
                </TableCell>
                <TableCell className="max-w-md py-4">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </TableCell>
                <TableCell className="text-right py-4">
                  <span className="inline-flex items-center justify-center font-semibold text-sm tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
