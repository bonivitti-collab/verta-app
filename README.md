# VERTA Construtech IDE

> Plataforma Construtech SaaS de Inteligência Artificial para Engenharia Civil, Arquitetura e Gestão de Obras (vinculada ao ecossistema do **Grupo Vitti / Sentinel Systems**).

[![GitHub](https://img.shields.io/badge/GitHub-bonivitti--collab%2Fverta--app-c59b27?style=flat-square&logo=github)](https://github.com/bonivitti-collab/verta-app)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![VERTA AI Core](https://img.shields.io/badge/VERTA%20Core-Neural%20Engine%20v2.5-946f19?style=flat-square)](https://github.com/bonivitti-collab/verta-app)

---

## 🏛️ Visão Geral

O **VERTA** foi concebido sob a estética ultra-clean de **IDE Técnico Minimalista** (inspirado no Antigravity IDE), estruturado em um layout de 3 painéis (**Three-Pane IDE Layout**):

```
+---------------------------------------------------------------------------------------------------+
|  [VERTA IDE]  Residencial Costa Esmeralda - Lote 14B  |  Core AI: VERTA v2.5  |  84/100 cr  [Key]  |
+--------------------------+-------------------------------------+----------------------------------+
| PAINEL ESQUERDO          | PAINEL CENTRAL                      | PAINEL DIREITO                   |
| (Workspace & Estúdios)   | (Agente IA Verta)                   | (Dynamic Canvas & Live Preview)  |
|                          |                                     |                                  |
| 1. 📐 Projetos & Estudo  | • Chat com CoT (Chain-of-Thought)   | [📐 Planta Baixa SVG 2D]         |
| 2. 💰 Custos & SINAPI    | • Upload multimodal (fotos/plantas) | [💰 Orçamento SINAPI Excel]      |
| 3. 👷 Gestão de Canteiro | • Normas ABNT NBR embutidas         | [📄 Laudo Pericial A4 Judicial]  |
| 4. 🔍 Engenharia/Laudos  | • Prompts rápidos de Engenharia     | [📍 Canteiro & Radar GPS]        |
|                          | • Margem de Lucro SaaS > 85%        |                                  |
| • Telemetria de Obra     |                                     | • Zoom, Exportação SVG / CSV     |
| • Clima Litoral (Vento)  |                                     | • Assinatura Digital ICP-Brasil  |
+--------------------------+-------------------------------------+----------------------------------+
```

---

## ⚙️ Os 4 Estúdios Centrais

1. **📐 Estúdio de Projetos & Estudo:**
   - Geração paramétrica de plantas baixas com cotas em metros e cálculo de áreas m².
   - **Decora Verta:** IA multimodal para acabamentos e pisos.
   - Carta solar bioclimática e ventilação cruzada litorânea (NBR 15575).

2. **💰 Estúdio de Custos & Suprimentos:**
   - **CotaCasa:** Extração e equalização de quantitativos.
   - Orçamento paramétrico baseado no **SINAPI (Não-Desonerado 2026)** e **CUB**.
   - Planilha editável estilo Excel com recálculo automático de BDI e Curva ABC.

3. **👷 Estúdio de Gestão de Canteiro:**
   - **Verta Ponto:** Ponto eletrônico antifraude com cerca virtual (geofencing por coordenadas GPS do lote, raio de 30m - Portaria 671 MTE).
   - **Controle Inteligente de Insumos:** Confronto do consumo teórico da etapa com recebimento físico (cimento, areia, aço, brita).

4. **🔍 Estúdio de Engenharia & Laudos:**
   - Diagnóstico fotográfico de patologias (fissuras de cisalhamento, umidade ascendente, ataque por cloretos/maresia NBR 6118 Classe IV).
   - Gerador de **Laudos Periciais A4 diagramados** com carimbo digital, ART vinculada e hash SHA-256.

---

## 💎 Modelo de Negócio (Freemium + SaaS)

- **Plano Gratuito (R$ 0/mês):** 10 créditos de IA/mês, plantas básicas e laudos com marca d'água VERTA.
- **Plano Pro (R$ 97/mês):** 100 créditos/mês, laudos sem marca d'água para juízo, CotaCasa e orçamentos SINAPI.
- **Plano Construtora (R$ 247/mês):** Múltiplos projetos, Verta Ponto GPS ilimitado e controle antifraude de insumos.

---

## 🚀 Como Executar Localmente

```bash
# 1. Clonar repositório
git clone https://github.com/bonivitti-collab/verta-app.git
cd verta-app

# 2. Instalar dependências
npm install

# 3. Iniciar servidor local
npm run dev

# 4. Acessar no navegador
http://localhost:5173
```

---

## 🔒 Segurança e Conexão Neural de Backend

O VERTA integra-se no backend via SDK oficial `@google/genai` com controle de telemetria e margem de consumo superior a 85%. Você pode configurar a chave de inferência no botão **Conexão IA** na barra superior ou definir a variável `.env`:

```env
VITE_AI_API_KEY=...
```

Desenvolvido com excelência para o ecossistema **Grupo Vitti / Sentinel Systems**.
