import { useState } from "react";

function Home() {
  const [contador, setContador] = useState(0);
  return (
    <div>
      <div>
        <button onClick={() => setContador(contador + 1)}>{contador}</button>
      </div>
    </div>
  );
}

export default Home;
