# 🤖 ContractMind AI - Agent Definitions

Dokumen ini mendefinisikan peran, tanggung jawab, *input*, dan *output* untuk masing-masing dari 9 agen AI khusus dalam sistem ContractMind. Dokumen ini berfungsi sebagai panduan dan sumber kebenaran (source of truth) bagi setiap agen agar mereka memahami batasan dan tugas mereka saat dipanggil oleh sistem.

---

## 1. 🎯 Orchestrator Agent
**Peran:** Koordinator pusat dan supervisor sistem multi-agent.
- **Input:** Permintaan pengguna (file Solidity, URL GitHub, atau Address Contract) dan opsi konfigurasi.
- **Proses:** 
  1. Memvalidasi dan menormalisasi *input*.
  2. Mendelegasikan tugas ke agen-agen spesifik dengan urutan yang benar (misal: *Parser* harus selesai sebelum *Flow* bekerja).
  3. Mengoordinasikan komunikasi antar-agen (meneruskan data AST, grafik dependensi, dll).
- **Output:** Laporan akhir yang sudah disatukan dan instruksi pengiriman melalui CROO CAP Protocol.

---

## 2. 📝 Parser Agent
**Peran:** Pengekstrak kode dan pembuat AST (Abstract Syntax Tree).
- **Input:** Kode sumber (source code) Solidity mentah.
- **Proses:** 
  1. Melakukan *parsing* terhadap kode Solidity.
  2. Mengekstrak struktur seperti: *Contracts, Interfaces, Libraries, Structs, Enums, Events, Errors, Modifiers, Functions,* dan *State Variables*.
- **Output:** Representasi AST berstruktur dalam format JSON.

---

## 3. 🔗 Dependency Agent
**Peran:** Arsitek dan pembuat peta protokol.
- **Input:** AST berstruktur JSON (dari Parser Agent).
- **Proses:** 
  1. Menyelesaikan (resolve) jalur *import* internal maupun eksternal.
  2. Membangun pohon pewarisan sifat / *inheritance* (contoh: `contract A is B, C`).
  3. Memetakan pemanggilan fungsi antar kontrak (external calls).
- **Output:** Grafik Dependensi Kontrak (Contract Dependency Graph) dan Peta Arsitektur Protokol.

---

## 4. 💼 Business Logic Agent
**Peran:** Penerjemah protokol dan pemodel ekonomi.
- **Input:** Source code, AST, dan Grafik Dependensi.
- **Proses:** 
  1. Menganalisis *niat/tujuan* dari kode (mengapa protokol ini ada).
  2. Melacak aliran nilai aset dan *tokenomics*.
  3. Mengidentifikasi kepemilikan (ownership), peran hak akses (access control), dan transisi siklus hidup protokol.
- **Output:** Penjelasan bahasa natural (bahasa awam) mengenai model ekonomi, struktur insentif, dan logika bisnis.

---

## 5. 🔄 Flow Agent
**Peran:** Visualisator dan pemeta perilaku eksekusi.
- **Input:** AST dan data dari Business Logic Agent.
- **Proses:** 
  1. Memetakan langkah demi langkah aliran eksekusi suatu fungsi.
  2. Mengidentifikasi transisi mesin status / *state machine* (contoh: `PENDING` -> `ACTIVE` -> `COMPLETED`).
- **Output:** Diagram menggunakan Mermaid.js (*State Machines, Sequence Diagrams, Call Graphs*).

---

## 6. 🛡️ Security Agent
**Peran:** Auditor keamanan *smart contract*.
- **Input:** Konteks protokol lengkap (AST, Dependensi, Flow).
- **Proses:** 
  1. Memindai kerentanan yang umum terjadi (*Reentrancy, Integer Overflow, Access Control flaws, Oracle Risks, DOS Vectors*, dll).
  2. Memberikan skor tingkat keparahan (*Critical, High, Medium, Low, Informational*).
- **Output:** Laporan penilaian risiko terstruktur dengan klasifikasi tingkat keparahan dan panduan perbaikan yang bisa langsung ditindaklanjuti.

---

## 7. ⛽ Gas Optimization Agent
**Peran:** Ahli efisiensi dan optimasi biaya transaksi.
- **Input:** Source code dan AST.
- **Proses:** 
  1. Mengidentifikasi pola penulisan kode yang boros (contoh: penggunaan `memory` vs `calldata`, kurangnya `immutable`/`constant`, *looping* yang tidak optimal, peluang *storage packing*).
- **Output:** Saran modifikasi kode untuk mengurangi biaya *gas* saat *deploy* maupun eksekusi fungsi.

---

## 8. 📄 Documentation Agent
**Peran:** *Technical Writer* (Penulis teknis dokumentasi).
- **Input:** Seluruh *output* dari agen-agen sebelumnya (Business Logic, Security, Flow, dll).
- **Proses:** 
  1. Memformat seluruh kecerdasan yang dikumpulkan menjadi dokumentasi yang rapi.
  2. Menghasilkan dokumentasi API bergaya NatSpec dan panduan integrasi untuk *developer*.
- **Output:** Dokumentasi siap rilis dalam berbagai format (Markdown, JSON, PDF).

---

## 9. 💬 Interactive Q&A Agent
**Peran:** Asisten tanya-jawab yang peka terhadap konteks.
- **Input:** Pertanyaan lanjutan dari pengguna dan seluruh konteks analisis yang tersimpan di RAG (Vector Database).
- **Proses:** 
  1. Mengambil (retrieve) konteks yang relevan mengenai protokol yang sedang dibahas.
  2. Menghasilkan jawaban yang sangat spesifik berdasarkan arsitektur dan logika yang telah dianalisis sebelumnya.
- **Output:** Jawaban kontekstual dalam bahasa natural untuk pertanyaan pengguna.

---

## 🔄 Alur Eksekusi Agen (Execution Flow)
Agar sistem berjalan optimal, Orchestrator Agent akan memanggil agen dengan urutan berikut:
1. **Fase 1 (Ingestion):** Orchestrator memanggil **Parser**.
2. **Fase 2 (Mapping):** Hasil Parser dikirim ke **Dependency**.
3. **Fase 3 (Analysis):** Hasil Dependency dikirim secara paralel ke **Business Logic, Flow, Security,** dan **Gas**.
4. **Fase 4 (Synthesis):** Hasil Fase 3 dikumpulkan dan dikirim ke **Documentation** untuk dibuatkan laporan.
5. **Fase 5 (Interaction):** **Interactive Q&A** aktif berjalan (standby) melayani pengguna dengan referensi dari laporan Fase 4.
