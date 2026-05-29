import React, { useState } from 'react';

export default function ListaItens() {
    const [itens, setItens] = useState([]);
    const [input, setInput] = useState('');

    const adicionarItem = () => {
        if (input.trim()) {
            setItens([...itens, { id: Date.now(), nome: input }]);
            setInput('');
        }
    };

    const removerItem = (id) => {
        setItens(itens.filter(item => item.id !== id));
    };

    return (
        <div>
            <h2>Lista de Itens</h2>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && adicionarItem()}
                placeholder="Digite um item"
            />
            <button onClick={adicionarItem}>Adicionar</button>
            
            <ul>
                {itens.map(item => (
                    <li key={item.id}>
                        {item.nome}
                        <button onClick={() => removerItem(item.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}