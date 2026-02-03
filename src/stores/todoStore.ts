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
