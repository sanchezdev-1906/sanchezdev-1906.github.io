export const DBData = {
    name: "dover",
    version: 1
}
export const initial = indexedDB.open(DBData.name, DBData.version)

// Creando la base de datos
initial.onupgradeneeded = () =>{
    const db = initial.result
    const users = db.createObjectStore(
        "users", 
        {keyPath: "email"}
    )
    users.createIndex(
        "username",
        "username", 
        {unique: true}
    )
    users.add({
        email: "sincere@gmail.com",
        username: "bret",
        alias: undefined,
        password: "Bret12345",
        description: "",
        img: undefined
    })
    users.add({
        email: "nathan@gmail.com",
        username: "samantha",
        alias: undefined,
        password: "Samantha12345",
        description: "",
        img: undefined
    })

    const articles = db.createObjectStore(
        "articles", 
        {keyPath: "id", autoIncrement: true}
    )
    articles.createIndex(
        "user",
        "user",
        {unique: false}
    )
    articles.createIndex(
        "datetime",
        "datetime", 
        {unique: false}
    )

    articles.add({
        user: "samantha",
        title: "Como crear un articulo en dover",
        datetime: "2023-04-18T15:30:45.123Z", 
        content: `<h2>Cómo crear un artículo en Dover</h2><p>Para comenzar a crear un artículo en Dover, simplemente inicia sesión en tu cuenta y haz clic en el botón "Crear Artículo".</p><p>Luego, completa los campos obligatorios, como el título y el contenido del artículo. Puedes dar formato al texto, agregar imágenes y enlaces para hacer tu artículo más atractivo. ¡No olvides guardar tu trabajo!</p>`,  
        img: "/assets/img/typing.jpg",
        tags: ["blog"],
        likes: 1,
        comments: 0,
    })
    articles.add({
        user: "bret",
        title: "Receta de Gelatina",
        datetime: "2023-04-18T15:30:45.123Z", 
        content: `<h2>Receta de Gelatina</h2>
        <p>Disfruta de una deliciosa gelatina casera con esta fácil receta. Comienza mezclando un paquete de gelatina en polvo con agua caliente, revolviendo bien hasta que se disuelva por completo.</p>
        <p>Luego, agrega agua fría y refrigera la mezcla durante al menos 4 horas. ¡Voilà! Tendrás una refrescante gelatina lista para servir. Puedes personalizarla con frutas o crema, ¡y disfrutar de un postre simple y sabroso!</p>
        <blockquote>
          <p>Experimenta con diferentes sabores y texturas para crear tu propia versión única de gelatina casera. ¡Deja volar tu creatividad!</p>
        </blockquote>
        <p>Comparte esta receta con amigos y familiares para que todos puedan disfrutar de este delicioso postre.</p>
        <h3>Ingredientes:</h3>
        <ul>
          <li>1 paquete de gelatina en polvo (sabor de tu elección)</li>
          <li>Agua caliente y agua fría</li>
          <li>Frutas frescas (opcional)</li>
          <li>Crema batida (opcional)</li>
        </ul>
        <p>¡Prepárate para sorprender a tus seres queridos con esta receta fácil y deliciosa!</p>`,
        img: "/assets/img/gelatina.jpg",
        tags: ["cocina", "postres"],
        likes: 0,
        comments: 0,
    });
    articles.add({
        user: "samantha",
        title: "Consejos para un Desayuno Saludable",
        datetime: new Date().toISOString(),
        content: `<h2><i>Consejos para un Desayuno Saludable</i></h2>
        <p>Comienza tu día con energía siguiendo estos consejos para un desayuno saludable. Descubre opciones equilibradas que te proporcionarán los nutrientes necesarios para enfrentar tus actividades diarias.</p>
        <p>Exploraremos recetas simples y rápidas para que desayunar bien sea fácil y delicioso.</p>
        <h3>Recetas Saludables:</h3>
        <ol>
          <li>Smoothie de frutas con yogur natural</li>
          <li>Avena con frutas frescas y frutos secos</li>
          <li>Huevos revueltos con espinacas y aguacate</li>
        </ol>
        <p>Recuerda incluir alimentos de todos los grupos para obtener una variedad de nutrientes esenciales. ¡Tu cuerpo te lo agradecerá!</p>
        <h4>Consejos adicionales:</h4>
        <ul>
          <li>Bebe agua antes de empezar el desayuno para hidratarte.</li>
          <li>Evita los alimentos altos en azúcares añadidos.</li>
          <li>Programa tiempo para desayunar sin prisas.</li>
        </ul>
        <p>¡Haz del desayuno una parte saludable y deliciosa de tu rutina diaria!</p>`,
        img: "/assets/img/breakfast.jpg",
        tags: ["salud", "desayuno"],
        likes: 0,
        comments: 0,
    });
    articles.add({
        user: "bret",
        title: "Cómo Cultivar un Jardín en Casa",
        datetime: new Date().toISOString(),
        content: `<h2><i>Cómo Cultivar un Jardín en Casa</i></h2>
        <p>Sumérgete en el mundo de la jardinería con estos consejos para cultivar un jardín en casa. Desde la elección de las plantas hasta los cuidados diarios, te guiaremos en cada paso para crear un hermoso jardín en tu propio espacio.</p>
        <p>Descubre la satisfacción de cultivar tus propias flores, hierbas o vegetales.</p>
        <blockquote>
          <p>La conexión con la tierra y la naturaleza es terapéutica. Cultivar un jardín te proporciona un espacio tranquilo para reflexionar y cuidar de la vida que crece a tu alrededor.</p>
        </blockquote>
        <p>Consejos esenciales para tu jardín:</p>
        <ul>
          <li>Selecciona plantas adecuadas para tu clima.</li>
          <li>Proporciona suficiente luz solar y agua.</li>
          <li>Utiliza abono orgánico para enriquecer el suelo.</li>
        </ul>
        <p>¡Haz de tu hogar un oasis verde con tu propio jardín!</p>`,
        img: "/assets/img/garden.jpg",
        tags: ["jardinería", "naturaleza"],
        likes: 1,
        comments: 0,
    });  
    articles.add({
        user: "bret",
        title: "Cómo Hacer Pizza Casera",
        datetime: new Date().toISOString(),
        content: `<h2><i>Cómo Hacer Pizza Casera</i></h2>
        <p>Descubre cómo preparar una deliciosa pizza casera desde cero. Desde la masa hasta los ingredientes, te mostramos todos los pasos para lograr una pizza perfecta en la comodidad de tu hogar.</p>
        <p>Atrévete a experimentar con diferentes toppings y salsas para personalizar tu pizza a tu gusto.</p>
        <h3>Ingredientes Básicos:</h3>
        <ul>
          <li>Masa para pizza (casera o comprada)</li>
          <li>Salsa de tomate</li>
          <li>Queso mozzarella</li>
          <li>Ingredientes adicionales según tu preferencia</li>
        </ul>
        <blockquote>
          <p>La pizza casera no solo es deliciosa, sino también una actividad divertida para compartir con amigos y familiares. ¡Todos pueden personalizar su propia pizza!</p>
        </blockquote>
        <p>Sigue nuestros consejos y convierte tu cocina en una pizzería artesanal.</p>`,
        img: "/assets/img/pizza.jpg",
        tags: ["cocina", "pizza"],
        likes: 0,
        comments: 0,
    });  
    articles.add({
        user: "samantha",
        title: "Rutina de Ejercicios en Casa",
        datetime: new Date().toISOString(),
        content: `<h2><i>Rutina de Ejercicios en Casa</i></h2>
        <p>Mantente activo y saludable con esta rutina de ejercicios que puedes hacer en la comodidad de tu hogar. No necesitas equipo especial, solo un poco de espacio y motivación para seguir estos ejercicios diseñados para fortalecer tu cuerpo.</p>
        <p>Incorpora esta rutina a tu día a día y disfruta de los beneficios del ejercicio regular.</p>
        <h3>Consejos para una Rutina Efectiva:</h3>
        <ul>
          <li>Calienta antes de comenzar los ejercicios.</li>
          <li>Varía tus rutinas para evitar el aburrimiento.</li>
          <li>Escucha a tu cuerpo y descansa cuando sea necesario.</li>
        </ul>
        <blockquote>
          <p>El ejercicio regular no solo es bueno para tu cuerpo, sino también para tu mente. ¡Disfruta de la sensación de logro con cada sesión de ejercicios!</p>
        </blockquote>
        <p>¿Listo para comenzar tu viaje hacia una vida más activa?</p>`,
        img: "/assets/img/excercise.jpg",
        tags: ["fitness", "salud"],
        likes: 0,
        comments: 0,
    });
    articles.add({
        user: "bret",
        title: "Viaje a la Naturaleza: Escapada a la Montaña",
        datetime: new Date().toISOString(),
        content: `<h2>Viaje a la Naturaleza: <i>Escapada a la Montaña</i></h2>
        <p>Descubre la belleza de la naturaleza con esta guía para una <b>escapada a la montaña</b>. Desde la planificación del viaje hasta las actividades al aire libre, te proporcionamos consejos para disfrutar al máximo de tu experiencia en la montaña.</p>
        <p>Explora senderos, admira paisajes impresionantes y desconéctate del ajetreo diario.</p>
        
        <blockquote>
          <p>La montaña es un lugar mágico donde la naturaleza te envuelve con su esplendor. Aprovecha cada momento y deja que la serenidad del entorno te guíe.</p>
        </blockquote>
        
        <p>No te pierdas las siguientes actividades durante tu escapada:</p>
        <ul>
          <li><a href="#senderismo">Senderismo</a></li>
          <li><a href="#avistamiento">Avistamiento de aves</a></li>
          <li><a href="#fotografia">Fotografía de la naturaleza</a></li>
        </ul>
        
        <p>Recuerda llevar contigo:</p>
        <ol>
          <li>Ropa cómoda y resistente.</li>
          <li>Zapatos adecuados para caminar.</li>
          <li>Agua y refrigerios.</li>
        </ol>
        
        <q>La montaña llama y debemos ir.</q>
        
        <h3>Consejos para tu Viaje</h3>
        <p>1. Infórmate sobre el clima antes de viajar.</p>
        <p>2. Lleva una brújula o utiliza aplicaciones de navegación para senderismo.</p>
        
        <h4>Precauciones de Seguridad</h4>
        <p>Recuerda seguir las medidas de seguridad durante tu viaje:</p>
        <ol>
          <li>Notifica tu itinerario a alguien de confianza.</li>
          <li>Lleva un botiquín de primeros auxilios.</li>
          <li>Respeta las señales y reglas del parque natural.</li>
        </ol>`,
        img: "/assets/img/mountain.jpg",
        tags: ["viaje", "naturaleza"],
        likes: 0,
        comments: 0,
    });
    const comments = db.createObjectStore(
        "comments", 
        {keyPath: "id", autoIncrement: true}
    )
    comments.createIndex(
        "articleid",
        "articleid", 
        {unique: false}
    )
    comments.createIndex(
        "datetime",
        "datetime", 
        {unique: false}
    )
    const products = db.createObjectStore(
        "products", 
        {keyPath: "id", autoIncrement: true}
    )
    products.createIndex(
        "user",
        "user", 
        {unique: false}
    )
    const tags = db.createObjectStore(
        "tags", 
        {keyPath: "name"}
    )   
    tags.add({
        name: "blog",
        quantity: 1
    })
    tags.add({
        name: "salud",
        quantity: 2
    })
    tags.add({
        name: "jardineria",
        quantity: 1
    })
    tags.add({
        name: "cocina",
        quantity: 2
    })
    tags.add({
        name: "fitness",
        quantity: 1
    })
    tags.add({
        name: "viaje",
        quantity: 1
    })
    tags.add({
        name: "naturaleza",
        quantity: 1
    })

    const likes = db.createObjectStore(
        "likes", 
        {keyPath: "user"}
    )  
    likes.add({
        user: "samantha",
        likes: [ 1, 4] 
    })
}
