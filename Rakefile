task run: %w[deps]

task :run do 
	sh "ruby src/webapp.rb"
end

task :deps do
	sh "if [gem list --local | grep sinatra] \
	do \
		echo \"Found\" \
	else \
		echo \"Not Found\" \

	done"
	#gem install sinatra"
end
