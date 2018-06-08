class TrackPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end

  end
  def destroy?
    record.playlist.user == user
  end
end
