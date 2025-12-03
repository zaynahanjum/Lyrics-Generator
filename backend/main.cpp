#include "crow.h"
#include <vector>
#include <string>

//Song STRUCT

struct Song {
    std::string title;
    std::string singer;
    std::vector<std::string> lyrics;
    std::string imageUrl;
};


//SongService CLASS
class SongService {
public:
    std::vector<Song> getAllSongs() {
        return {
            {
                "Count on Me",
                "Bruno Mars",
                {
                   "Oh-oh-oh",
                    "If you ever find yourself stuck in the middle of the sea",
                    "I'll sail the world to find you",
                    "If you ever find yourself lost in the dark and you can't see",
                    "I'll be the light to guide you",
                    "We find out what we're made of",
                    "When we are called to help our friends in need",
                    "You can count on me like one, two, three, I'll be there",                        "And I know when I need it",
                    "I can count on you like four, three, two and you'll be there",
                    "'Cause that's what friends are supposed to do, oh, yeah",
                    "Ooh-ooh-ooh, ooh-ooh-ooh",
                    "Yeah, yeah",
                    "If you're tossin' and you're turnin' and you just can't fall asleep",
                    "I'll sing a song beside you",
                    "And if you ever forget how much you really mean to me",
                    "Every day, I will remind you, oh",
                    "We find out what we're made of",
                    "When we are called to help our friends in need"
                },
                "https://i.scdn.co/image/ab67616d0000b273f6b55ca93bd33211227b502b"
            },
            {
                "Photograph",
                "Ed Sheeran",
                {
                    "Lovin' can hurt",
                    "Lovin' can hurt sometimes",
                    "But it's the only thing that I know",
                    "And when it gets hard",
                    "You know it can get hard sometimes",
                    "It is the only thing that makes us feel alive",
                    "We keep this love in a photograph",
                    "We made these memories for ourselves",
                    "Where our eyes are never closin'",
                    "Hearts are never broken",
                    "And time's forever frozen still",
                    "So you can keep me",
                    "Inside the pocket of your ripped jeans",
                    "Holdin' me closer 'til our eyes meet",
                    "You won't ever be alone",
                    "Wait for me to come home",
                    "Lovin' can heal",
                    "Lovin' can mend your soul",
                    "And it's the only thing that I know, know",
                    "I swear it will get easier",
                    "Remember that with every piece of ya",
                    "Mm, and it's the only thing we take with us when we die",
                    "Mm, we keep this love in this photograph",
                    "We made these memories for ourselves",
                    "Where our eyes are never closin'",
                    "Hearts were never broken",
                    "And time's forever frozen still"
                },
                "https://i.scdn.co/image/ab67616d0000b27313b3e37318a0c247b550bccd"
            },
            {
                "Raabta",
                "Arijit Singh",
                {
                    "Kehte hain:",
                    "Khuda ne iss jahaan mein",
                    "Sabhi ke liye kisi na kisi ko hai banaaya",
                    "har kisi ke liye",
                    "Tera milna hai uss rab ka ishaara",
                    "Maano mujhko banaya tere jaise hi kisi ke liye",
                    "Kuch toh hai tujh se raabta",
                    "Kuch toh hai tujh se raabta",
                    "Kaise hum jaane, hume kya pata",
                    "Kuch toh hai tujh se raabta",
                    "Tu humsafar hai",
                    "Phir kya fikar hai",
                    "Jeene ki wajah hi yehi hai",
                    "Marna issi ke liye",
                    "Kehte hain:",
                    "Khuda ne iss jahaan mein",
                    "Sabhi ke liye kisi na kisi ko hai banaaya",
                    "har kisi ke liye…"
                },
                "https://popcornsg.s3.amazonaws.com/movies/650/4214-12374-Raabta.jpg"
            },
            {
                "A Thousand Years",
                "Christina Perri",
                {
                    "Heart beats fast",
                    "Colors and promises",
                    "How to be brave",
                    "How can I love when I'm afraid to fall",
                    "But watching you stand alone",
                    "All of my doubt suddenly goes away somehow",
                    "One step closer",
                    "I have died every day waiting for you",
                    "Darling, don't be afraid",
                    "I have loved you for a thousand years",
                    "I'll love you for a thousand more",
                    "Time stands still",
                    "Beauty in all she is",
                    "I will be brave",
                    "I will not let anything take away",
                    "What's standing in front of me",
                    "Every breath, every hour has come to this",
                    "One step closer",
                    "I have died every day waiting for you",
                    "Darling, don't be afraid",
                    "I have loved you for a thousand years",
                    "I'll love you for a thousand more"
                },
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuZ9hMAX37Tvu-p9CMpdzc7cCDEltW9t-BdQ&s"
            },
            {
                "Dil Diyaa Gallan",
                "Atif Aslam",
                {
                    "Kachchi doriyon doriyon doriyon se",
                    "Mainu tu baandh le",
                    "Pakki yaariyon yaariyon yaariyon mein",
                    "Aunde na faasle",
                    "Eh narazgi kaagzi saari teri",
                    "Mere sohneya sun lai meri",
                    "Dil diyan gallan",
                    "Karange naal naal beh ke",
                    "Akh naal akh nu mila ke",
                    "Dil diyan gallan haye",
                    "Karange roz roz beh ke",
                    "Sachiyan mohabbtan nibha ke",
                    "Sataye mainu kyun",
                    "Dikhaye mainu kyun",
                    "Aivein jhoothi moothi",
                    "Russ ke russa ke",
                    "Dil diyan gallan",
                    "Karange naal naal beh ke",
                    "Akh naal akh nu mila ke"
                },
                "https://i.scdn.co/image/ab67616d0000b2736b0dddf772efee7cc90d3443"
            }
        };
    }
};


//SongController CLASS

class SongController {
private:
    SongService service;

public:
    void registerRoutes(crow::SimpleApp& app) {

        // Route: /songs  (returns all 5 songs)
        CROW_ROUTE(app, "/songs")
        ([this]() {
            auto songs = service.getAllSongs();

            crow::json::wvalue result;
            result["songs"] = crow::json::wvalue::list(songs.size());

    for (size_t i = 0; i < songs.size(); i++) {
        result["songs"][i]["title"] = songs[i].title;
        result["songs"][i]["singer"] = songs[i].singer;

        result["songs"][i]["lyrics"] =
            crow::json::wvalue::list(songs[i].lyrics.size());

        result["songs"][i]["imageUrl"] = songs[i].imageUrl;

        for (size_t j = 0; j < songs[i].lyrics.size(); j++) {
            result["songs"][i]["lyrics"][j] = songs[i].lyrics[j];
        }
    }

    crow::response res(result.dump());
    res.add_header("Access-Control-Allow-Origin", "*");
    res.add_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.add_header("Access-Control-Allow-Headers", "Content-Type");

    return res;
});
    }
};


int main() {
    crow::SimpleApp app;

    SongController sc;
    sc.registerRoutes(app);

    app.port(8080).multithreaded().run();
}
