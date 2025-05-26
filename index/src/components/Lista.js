import React from 'react';
import styles from './Lista.module.css';

function Lista({tarefa, alternaConclusao, removerTarefa}) { // informações
    return (
        <li className='(styles.item)'> 
            <span
                onClick={() => alternaConclusao(tarefa.id)}
                className={tarefa.conluida ? StyleSheet.concluida : ''}
            >
                {tarefa.texto}
            </span>

             <button onClick={() => removerTarefa(tarefa.id)}>Remover tarefa</button>
        </li>
    );
}

export default Lista; // Chamar a função para outro lugar do teu código darh hellow! ;-; // import from 'Lista'