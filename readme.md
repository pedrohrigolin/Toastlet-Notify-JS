# 🔔 Toastlet Notify

Exibe uma notificação flutuante (toast) leve e responsiva, visualmente inspirada no PNotify 4+ com estilo Bootstrap.

Esta biblioteca foi criada para uso pessoal com foco em leveza, rapidez e baixo acoplamento, oferecendo apenas o essencial para atender uma necessidade específica.

---

## ⚙️ Parâmetros

### ▸ `type` (obrigatório)

Tipo da notificação. Define o estilo visual e semântico do toast:

| Tipo    | Descrição                                 |
|---------|--------------------------------------------|
| `success` | ✅ Notificação de sucesso (verde).       |
| `error`   | ❌ Notificação de erro (vermelha).       |
| `info`    | ℹ️ Notificação informativa (azul).       |
| `warning` | ⚠️ Notificação de alerta (amarela/laranja). |
| `notice`  | 🔔 Alias de warning, mesmo estilo e efeito visual. |

---

### ▸ `message` (obrigatório)

Texto da notificação a ser exibido.

- Aceita somente texto puro (sem HTML).
- Pode conter quebras de linha simples (`\n`), se necessário.

```js
toastletNotify.notify('info', 'Bem-vindo ao sistema!');
```

---

### ▸ `options` (opcional)

Objeto para configurações adicionais da notificação.

| Propriedade | Tipo    | Padrão | Descrição |
|-------------|---------|--------|-----------|
| `sticky`    | boolean | `false` | Se `true`, o toast só fecha manualmente (sem tempo limite). |
| `duration`  | number  | `5000` | Duração da exibição em milissegundos. Ignorado se `sticky` for `true`. |
| `class`     | string  | `""`   | Classe(s) CSS adicionais para estilização customizada. |

> ❗ **Importante:** A biblioteca não suporta ícones customizáveis diretamente. A personalização deve ser feita via classes CSS aplicadas ao toast.

---

## 🧪 Exemplos

### ✅ Notificação básica

```js
toastletNotify.notify('success', 'Operação realizada com sucesso!');
```

### 🧲 Notificação fixa (sticky)

```js
toastletNotify.notify('warning', 'Atenção: revise os dados!', {
  sticky: true
});
```

### 🎨 Com classe de estilo customizada

```js
toastletNotify.notify('error', 'Erro ao salvar os dados.', {
  class: 'toast-red-border'
});
```

### ⏱️ Com tempo customizado

```js
toastletNotify.notify('info', 'Salvo com sucesso.', {
  duration: 8000
});
```

---

## 📦 Instalação

Inclua o arquivo JavaScript no seu HTML:

```html

<script src="toastlet-notify.js"></script>

// Via CDN

<script src="https://cdn.jsdelivr.net/gh/pedrohrigolin/Toastlet-Notify-JS@main/toastletNotify.min.js"></script>

```

> 🎨 O estilo está embutido no próprio script. Não é necessário incluir CSS externo.

---