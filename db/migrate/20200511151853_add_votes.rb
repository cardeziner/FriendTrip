class AddVotes < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :votes, :integer

  end
end
