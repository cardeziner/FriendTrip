module Invitation

  # A form object pretends to be 'invite', but accepts both 'email' and 'emails'.
  # It knows how to build all of the invite instances.
  class InviteForm
    include ActiveModel::Model

    attr_accessor :invitable_id, :invitable_type, :email, :emails
    attr_reader :invitable

    def self.model_name # form masquerades as 'invite'
      ActiveModel::Name.new(self, nil, 'Invite')
    end

    def initialize(attributes = {})
      @emails ||= []
      super
    end

    def invitable
      @invitable ||= @invitable_type.classify.constantize.find(@invitable_id)
    end

    def build_invites(current_user)
      all_emails.reject(&:blank?).collect do |e|
        Invite.new(invitable_id: @invitable_id, invitable_type: @invitable_type, sender_id: current_user.id, email: e)
      end
    end

    private

    def all_emails
      @emails + [@email]
    end
  end
end
