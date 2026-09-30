# Modelo de site — guia de preenchimento

## Como abrir
Dê dois cliques em `index.html`. Ele abre no navegador. Depois de editar qualquer arquivo, salve e atualize a página (F5).

## Passo 1 — Dados principais (js/config.js)
Abra `js/config.js` com o Bloco de Notas (ou VS Code) e preencha:
- nome e sobrenome (aparecem no logo, no rodapé e na aba do navegador)
- profissão e número de registro no conselho (deixe "" se não tiver)
- WhatsApp: só números, com 55 + DDD. Exemplo: `5511999999999`
- telefone (como aparece escrito), e-mail, usuário do Instagram (sem @)
- cidade e endereço
- link de compra e preços (só se for vender um material)
- mensagem que abre no WhatsApp

Os botões de WhatsApp, o link do Instagram e o rodapé se atualizam sozinhos.

## Passo 2 — Textos (index.html)
Use Ctrl+F e procure por `[PREENCHER]`. Cada um é um texto seu para escrever. Ordem no site:
1. Topo: frase de impacto, subtítulo, palavra grande ao fundo, palavra vertical
2. Faixa rolante: 3 especialidades e o registro
3. Sobre mim: 3 parágrafos e 4 destaques
4. Para quem é: 3 situações do seu cliente
5. O que você recebe: 6 benefícios
6. Planos: 3 planos (nome, 3 números de resumo, descrição)
7. Depoimentos: frase de introdução e descrição de cada print (campo `alt`)
8. Instagram: descrição das fotos (`alt`)
9. Contato: frase final e convite
10. Material digital: opcional (se não vender nada, apague a seção inteira e o item "Material" do menu)

Também no começo do arquivo (dentro do `<head>`): título, descrição e palavras-chave para o Google, e o endereço do site (`seudominio.com.br`).

## Passo 3 — Fotos (pasta images/)
Substitua cada imagem de aviso por uma foto sua, com o mesmo nome de arquivo.

| Arquivo | Onde aparece | Tamanho ideal |
|---|---|---|
| images/foto-principal.jpg | Topo do site (vertical) | 800 x 1000 px |
| images/foto-sobre.jpg | Seção "Sobre mim" (vertical) | 700 x 900 px |
| images/capa-produto.jpg | Capa do material (horizontal) | 900 x 700 px |
| images/depoimentos/depoimento-1.jpg até 6 | Prints de conversas | ~400 px de largura, altura livre |
| images/instagram/post-1.jpg até 6 | Fotos dos seus posts | 500 x 500 px |
| images/favicon.svg | Ícone da aba do navegador | qualquer SVG (ou troque a letra "A") |

Se a sua foto for `.png`, mude também o nome no `index.html`, ou converta para `.jpg`.

## Passo 4 — Cores (opcional)
No começo de `css/style.css`, altere as variáveis `--gold`, `--gold-light` e `--gold-dark` para a sua cor de destaque.

## Antes de publicar
- Depoimentos: peça autorização por escrito e esconda nome e foto de quem aparece nos prints.
- Google Analytics: é opcional. O bloco está comentado no começo do `index.html`. Use o SEU código, nunca o de outra pessoa.
- Registro profissional: siga as regras do seu conselho (CRN, CRP, OAB etc.) sobre o que pode aparecer em divulgação, como "antes e depois" e promessas de resultado.
- Publicação: pode subir a pasta inteira em Netlify, Vercel, GitHub Pages ou na sua hospedagem.

## Estrutura
```
amanda-modelo/
├── index.html
├── LEIA-ME.md
├── css/style.css
├── js/
│   ├── config.js    ← dados principais (edite)
│   └── script.js    ← animações e menu (não precisa mexer)
└── images/          ← suas fotos
```
