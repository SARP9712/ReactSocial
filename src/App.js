import React,{useState} from "react";
import { faker } from '@faker-js/faker';

function App() {

  const [posts, setPosts] = useState([]);
  const [nuevoPost, setNuevoPost] = useState("");

  const crearPost = () => {
    if (nuevoPost.trim() === "") return;

    const post = {
      id: Date.now(),
      usename:faker.internet.username(),        
      contenido: nuevoPost,
      avatar: faker.image.avatar(),
      likes: 0,
      likeado: false,
      comentarios: [],
    };

    setPosts([post, ...posts]);  
    setNuevoPost("");            
  };




  const toggleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? {
            ...post,
            likeado: !post.likeado,
            likes: post.likeado ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  
 const agregarComentario = (id, texto) => {
  if (texto.texto.trim() === "") return;

  setPosts(posts.map(post =>
    post.id === id ? { ...post, comentarios: [...post.comentarios, texto] }
      : post
  ));
};

 
  return (
    <div>
      <textarea
        rows="3"
        placeholder="¿Qué está pasando?"
        value={nuevoPost}
        onChange={(e) => setNuevoPost(e.target.value)}
      />
      <button onClick={crearPost}>Publicar</button>

      {posts.map(post => (
        <div key={post.id} className="post">

          <div className="avatar-name">
           <img
      src={post.avatar}
      alt="avatar"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        marginRight: '10px'
      }}
      
    />
    <p>@{post.usename}</p>
    </div>
    
       <div className="box-comment">

           <p>{post.contenido}</p>
           <div className="likes" onClick={() => toggleLike(post.id)}>
            ❤️ {post.likes} {post.likeado ? " " : ""}
          </div>
       

          <ComentarioBox postId={post.id} onComentar={agregarComentario} />
        </div>

         

          {post.comentarios.map((c, i) => (
            <div key={i} className="comment" style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              <img
                src={c.avatar}
                alt="avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
              />
              <div className="user-comment">
                <strong>@{c.username}</strong>
                <p style={{ margin: 0 }}>{c.texto}</p>
              </div>
            </div>
          ))}

        
        </div>
      ))}
    </div>
  );
}

function ComentarioBox({ postId, onComentar }) {
  const [comentario, setComentario] = useState("");


   const generarDatosUsuario = () => {
    return {
      username: faker.internet.username(), 
      avatar: faker.image.avatar(),
    };
  };

    const enviar = () => {
    if (comentario.trim() === "") return;

    const usuario = generarDatosUsuario();

    const nuevoComentario = {
      texto: comentario,
      username: usuario.username,
      avatar: usuario.avatar,
    };

    onComentar(postId, nuevoComentario); 
    setComentario(""); 
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        value={comentario}
        placeholder="Escribe un comentario..."
        onChange={(e) => setComentario(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && enviar()}
      />
      <button onClick={enviar}>Comentar</button>
    </div>
  );
}

export default App;