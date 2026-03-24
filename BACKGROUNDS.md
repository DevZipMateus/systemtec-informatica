# Instruções para Backgrounds das Seções — Systemtec Informática

## 📸 Imagens Necessárias

O site está preparado para usar 6 imagens de background nas seções principais. Todas as imagens devem ser colocadas na pasta `images/`.

### Imagens Requeridas

| Arquivo | Seção | Dimensões Ideais | Tamanho Máximo |
|---------|-------|------------------|-----------------|
| `bg-hero.jpg` | Hero | 1920x1080px | 500KB |
| `bg-sobre.jpg` | Sobre | 1920x1080px | 500KB |
| `bg-produtos.jpg` | Produtos | 1920x1080px | 500KB |
| `bg-diferenciais.jpg` | Diferenciais | 1920x1080px | 500KB |
| `bg-depoimentos.jpg` | Depoimentos | 1920x1080px | 500KB |
| `bg-contato.jpg` | Contato | 1920x1080px | 500KB |

## 🎨 Recomendações de Conteúdo

### bg-hero.jpg
- **Tema**: Tecnologia, computadores, escritório moderno
- **Estilo**: Dinâmico, inspirador, moderno
- **Overlay**: Escuro (75% de opacidade)
- **Sugestão**: Imagem de computador high-end, RGB gaming, ou escritório tech

### bg-sobre.jpg
- **Tema**: Equipe, colaboração, inovação
- **Estilo**: Profissional, acolhedor
- **Overlay**: Claro (4% de opacidade)
- **Sugestão**: Imagem de equipe, brainstorming, ou espaço de trabalho criativo

### bg-produtos.jpg
- **Tema**: Produtos de tecnologia, periféricos, componentes
- **Estilo**: Limpo, organizado
- **Overlay**: Claro (2% de opacidade)
- **Sugestão**: Produtos em display, tecnologia colorida, ou estação de trabalho montada

### bg-diferenciais.jpg
- **Tema**: Destaque, sucesso, performance
- **Estilo**: Impactante, motivador
- **Overlay**: Escuro (80% de opacidade)
- **Sugestão**: Imagem de código, circuitos, ou performance visual

### bg-depoimentos.jpg
- **Tema**: Satisfação, clientes, comunidade
- **Estilo**: Positivo, acolhedor
- **Overlay**: Claro (4% de opacidade)
- **Sugestão**: Imagem de pessoas satisfeitas, comunidade online, ou feedback

### bg-contato.jpg
- **Tema**: Comunicação, suporte, aproximação
- **Estilo**: Profissional, convidativo
- **Overlay**: Claro (3% de opacidade)
- **Sugestão**: Imagem de comunicação, suporte, ou escritório receptivo

## 🔧 Como Adicionar as Imagens

### Passo 1: Preparar as Imagens
1. Redimensione as imagens para **1920x1080px** ou maior
2. Otimize o tamanho do arquivo (máximo 500KB cada)
3. Use formato **JPG** para melhor compressão

### Passo 2: Copiar para a Pasta
```bash
cp /caminho/da/imagem/bg-hero.jpg /home/ramal421/Documentos/sites\ calude/systemtec/images/
cp /caminho/da/imagem/bg-sobre.jpg /home/ramal421/Documentos/sites\ calude/systemtec/images/
# ... e assim por diante
```

### Passo 3: Commit e Push
```bash
cd /home/ramal421/Documentos/sites\ calude/systemtec
git add images/bg-*.jpg
git commit -m "feat: adicionar imagens de background das seções"
git push origin main
```

## 🎯 Recursos Gratuitos

Se precisar de imagens, aqui estão algumas opções:

- **Unsplash**: https://unsplash.com (imagens de alta qualidade, grátis)
- **Pexels**: https://pexels.com (fotos stock gratuitas)
- **Pixabay**: https://pixabay.com (imagens e vídeos livres)
- **Freepik**: https://freepik.com (design elements, imagens stock)

**Dicas de busca:**
- Para Hero: "modern office technology", "gaming setup", "computer workspace"
- Para Sobre: "team collaboration", "startup team", "brainstorming"
- Para Produtos: "computer parts", "tech products", "gaming peripherals"
- Para Diferenciais: "circuit board", "code", "performance"
- Para Depoimentos: "happy customers", "satisfied people", "community"
- Para Contato: "customer support", "communication", "office"

## 📊 Características Técnicas

### Parallax Effect
- ✅ Ativado em desktop (≥1280px)
- ✅ Desativado em tablet/mobile (≤1280px) para performance
- ✅ Funciona automaticamente — não requer configuração

### Overlays
Cada seção tem um overlay em gradiente para garantir legibilidade:

- **Hero**: `rgba(0, 0, 0, 0.75)` (overlay escuro 75%)
- **Sobre**: `rgba(255, 255, 255, 0.95)` (overlay claro 95%)
- **Produtos**: `rgba(255, 255, 255, 0.98)` (overlay muito claro)
- **Diferenciais**: `rgba(26, 26, 26, 0.8)` (overlay escuro 80%)
- **Depoimentos**: `rgba(245, 245, 245, 0.96)` (overlay claro)
- **Contato**: `rgba(255, 255, 255, 0.97)` (overlay claro)

### Fallback
Se alguma imagem não carregar, o site continuará funcionando com os gradientes base:
- Seções escuras: Gradiente preto → cinza escuro
- Seções claras: Gradiente branco → cinza claro

## ✅ Checklist

- [ ] Imagens redimensionadas para 1920x1080px
- [ ] Imagens otimizadas (<500KB)
- [ ] Todas as 6 imagens copiadas para `images/`
- [ ] Commit feito com as imagens
- [ ] Push para GitHub
- [ ] Site testado em desktop e mobile
- [ ] Parallax funcionando em desktop
- [ ] Texto legível com overlay

## 💡 Dicas de Otimização

1. **Use WebP** quando possível (formato mais moderno e leve)
2. **Comprima as imagens** usando TinyPNG ou ImageOptim
3. **Use CDN** (CloudFlare, Imgix) para melhor performance
4. **Lazy load** é automático no navegador moderno (images loading="lazy")

## 🆘 Troubleshooting

**Q: A imagem não aparece?**
A: Verifique se o arquivo está em `images/` e o nome exato está correto no CSS.

**Q: O parallax não funciona em mobile?**
A: Normal! Foi desativado propositalmente para melhor performance em mobile.

**Q: O texto fica ilegível?**
A: Ajuste a opacidade do overlay no CSS (valores mais altos = mais escuro).

**Q: Qual é o melhor tamanho de arquivo?**
A: Recomenda-se 200-400KB por imagem para carregar rápido.

---

**Data**: 24 de Março de 2026
**Status**: Pronto para adicionar imagens ✅
