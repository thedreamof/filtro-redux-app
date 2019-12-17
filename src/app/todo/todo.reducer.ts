import * as formTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar al mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');

todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer( state = estadoInicial,
                             action: formTodo.Acciones ): Todo[] {

    switch ( action.type ) {

        case formTodo.AGREGAR_TODO:
            const todo = new Todo( action.texto );
            return [ ...state, todo ];

        case formTodo.TOGGLE_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case formTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case formTodo.EDITAR_TODO:
            return state.map( todoEdit => {
                if ( todoEdit.id === action.id ) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });

        case formTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case formTodo.LIMPIAR_COMPLETADOS_TODO:
            return state.filter( todoEdit => !todoEdit.completado );

        default:
            return state;
    }
}
