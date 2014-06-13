directory "build"
directory "build/public"

file "build/public/ttt.js" => ["build/public", "src/js/ttt_model.js", "src/js/ttt_view.js", "src/js/ttt_controller.js", "src/js/ttt.js"] do
	puts "Generating build/public/ttt.js"
	%x[cat src/js/ttt_model.js > build/public/ttt.js &&
		cat src/js/ttt_view.js >> build/public/ttt.js &&
		cat src/js/ttt_controller.js >> build/public/ttt.js &&
		cat src/js/ttt.js >> build/public/ttt.js]
end

file "build/webapp.rb" => ["build", "src/server/webapp.rb"] do
	puts "Generating build/webapp.rb"
	%x[cp src/server/webapp.rb build/webapp.rb]
end

file "build/public/ttt.html" => ["build/public", "src/html/ttt.html"] do
	puts "Generating build/public/ttt.html"
	%x[cp src/html/ttt.html build/public/ttt.html]
end

task :run => ["build/public/ttt.js", "build/public/ttt.html", "build/webapp.rb"] do 
	puts "Running Tic-Tac-Toe"
	sh "ruby build/webapp.rb"
end

