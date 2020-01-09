# NBAFavoritePlayers 

This project web scrapes ESPN and allows users to access game log statistics from any current NBA player. Many stats and graphs 
are available regarding teams and/or players but this project is useful for looking specifically at how your favorite players' stats
change throughout the season, providing useful insight on their performance. 

Data scraped includes: date of game, opposing team, minutes played, field goal percentage, three point percentage,
free throw percentage, rebounds, assists, blocks, steals, personal fouls, turn overs, and (of course) points.

The code will scrape the stats into a CSV file and update whenever a player has played a game. This data is graphed in real time using
Chart.js, providing an elegent rendering of player's statistics on a graph. The graph allows for data selection such that users may 
select specific stats to look at instead of overlaying stats. 

# Technology Used

tldr: JavaScript, Node.js (asynchronous functions), request.js, cheerio.js, chart.js, HTTPS

