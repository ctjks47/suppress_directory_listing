const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
connections: {
routes: {
files: {
relativeTo: Path.join(__dirname, 'public')
}
}
}
});
server.connection({ port: 3000 });

server.register(Inert, () => {});

server.route({
method: 'GET',
path: '/documents/{user}/{file}',
handler: function(request, reply) {
var path = Path.join(request.params.user, request.params.file);
return reply.file(path);
}
});

server.start((err) => {

if (err) {
    throw err;
}

console.log('Server running at:', server.info.uri);
});