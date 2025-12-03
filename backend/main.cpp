#include "crow.h"

int main() {
    crow::App<crow::CORSHandler> app;

    // Configure CORS
    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global()
        .origin("*")
        .methods("GET"_method, "POST"_method)
        .allow_credentials();

    // Route: /hello?name=Zaynah
    CROW_ROUTE(app, "/hello")
    ([](const crow::request& req){
        const char* name = req.url_params.get("name");
        if (!name) name = "World";

        crow::json::wvalue response;
        response["message"] = std::string("Hello from Crow, ") + name;

        return response;
    });

    app.port(8080).multithreaded().run();
}
