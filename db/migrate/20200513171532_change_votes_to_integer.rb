class ChangeVotesToInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :events, :votes, :integer, using: 'votes::integer'
  end
end
