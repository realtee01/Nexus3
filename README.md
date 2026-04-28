# Nexchat3 - Web3 Chat Platform

Modern Web3 platform that allows users to connect their crypto wallet and chat with other users using their wallet-based identity, and send/receive crypto directly inside chat messages.

## Tech Stack

*   **Frontend**: React (Vite) + TypeScript
*   **Styling**: Tailwind CSS, shadcn/ui
*   **Animations**: Framer Motion, Spline (Interactive 3D)
*   **Web3**: Ethers.js, MetaMask injection

## Development Setup

1.  **Install Dependencies**
    Dependencies have been initialized using `npm`. Ensure you have `@splinetool/react-spline`, `ethers`, and `lucide-react` installed.
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Connecting your Wallet**
    Ensure you have the **MetaMask** browser extension installed. The app will detect the injected `window.ethereum` provider.

## Integrating Backend

The current branch includes mock frontend data pending the Supabase backend connection. The SQL schema is drafted in `schema.sql`.

To link the backend later:
1.  Initialize a Supabase project and execute `schema.sql` via the SQL Editor to set up tables.
2.  Add Supabase credentials (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) to a `.env` file.
3.  Implement a `lib/supabase.ts` singleton client.
4.  Replace the mock objects in `src/pages/Chat.tsx` and `src/pages/Dashboard.tsx` with hooks subscribing to `supabase.from('messages').on('INSERT')`.

## Sending Crypto 

* Sending crypto via chat opens a transaction dialogue via your provider (`ethers.BrowserProvider`) which prompts MetaMask. 
* Never rely strictly on local state confirmation - the UI tracks the transaction hash and queries the blockchain for receipt confirmation.
